import groq from 'groq';
import { sanityClient } from '~/lib/utils/sanityio';
import { groqCeleb } from '~/lib/utils/groqCeleb';
import { factsDataTransform } from '~/lib/utils/factsDataTransform';
import { getTags } from '~/lib/utils/getTags';
import { TCeleb, TSlug } from '~/lib/utils/types';

export async function getCelebDetails(slug: TSlug): Promise<undefined | TCeleb> {
    const celeb = await sanityClient.fetch(groqCeleb, { slug });

    if (!celeb) {
        return undefined;
    }

    const { oldContent, facts, ...rest } = celeb;
    const [orderOfTopics] = await sanityClient.fetch(
        groq`
            *[_type == 'orderOfTopics'][0]{
                'topics': topics[]->{name}.name
            }.topics
        `,
    );

    const transformedFacts = factsDataTransform(facts, orderOfTopics);
    const tags = getTags(transformedFacts, orderOfTopics);

    return { ...rest, facts: transformedFacts, tags };
}
