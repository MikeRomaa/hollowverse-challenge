import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { TCeleb } from '~/lib/utils/types';
import { getCelebDetails } from '~/lib/utils/getCelebDetails';
import { sanityClient } from '~/lib/utils/sanityio';
import { PageHead } from '~/lib/components/PageHead';
import { TagGroup } from '~/lib/components/Badge';
import { FactSection } from '~/lib/components/FactSection';
import { Container } from '~/lib/components/Container';

export interface CelebPageProps {
    celeb: TCeleb;
}

const Celeb: NextPage<CelebPageProps> = ({ celeb }) => {
    const imageProps = useNextSanityImage(sanityClient, celeb.picture);

    return (
        <Container className="font-medium">
            <PageHead />

            <div className="float-right relative w-32 aspect-[2/3]">
                <Image {...imageProps} alt={celeb.name} objectFit="cover" layout="fill" className="rounded-lg shadow-lg" />
            </div>

            <h2>Religion, politics, & ideas of</h2>
            <h1 className="font-display text-3xl mb-3">{celeb.name}</h1>

            <TagGroup tags={celeb.tags?.regular} className="mb-2"/>
            {celeb.tags?.lowConfidence.length && (
                <div className="inline-flex items-center gap-2 mb-5">
                    <p className="text-sm">Maybe</p>
                    <TagGroup tags={celeb.tags.lowConfidence} />
                </div>
            )}

            <hr className="my-3" />

            {celeb.facts?.groups && (
                Object.keys(celeb.facts.groups).map((group) => (
                    <FactSection
                        key={group}
                        title={group}
                        facts={celeb.facts!.groups[group]}
                    />
                ))
            )}
        </Container>
    );
};

export const getStaticProps = async () => {
    const celeb = await getCelebDetails('elon-musk');

    if (!celeb) {
        return { notFound: true };
    }

    return { props: { celeb } };
};

export default Celeb;
