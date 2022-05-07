import React, { useState } from 'react';
import classNames from 'classnames';
import { IoChevronForward } from 'react-icons/io5';
import { TagGroup } from '~/lib/components/Badge';
import { Fact } from '~/lib/utils/types';

interface FactSectionProps {
    title: string;
    facts: Fact[];
}

export const FactSection: React.FC<FactSectionProps> = ({ title, facts }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <div
                className="inline-flex items-center py-3"
                onClick={() => setExpanded(!expanded)}
            >
                <IoChevronForward className={classNames('transition duration-200 mr-2', { 'rotate-90': expanded })} />
                <h4 className="font-bold text-lg">{title}</h4>
            </div>
            <div className={classNames('overflow-hidden', { 'max-h-fit': expanded, 'max-h-0': !expanded })}>
                <div className="relative mb-8">
                    <span className="absolute top-2 left-[1.95rem] w-0.5 h-full border-l-2 border-l-gray-400" />
                    {facts.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1).map((fact, i) => (
                        <div key={i} className="relative ml-12 mb-5">
                            <div className="absolute -left-6 top-0.5 w-4 h-4 border-2 border-gray-400 rounded-full bg-white" />
                            <p className="text-gray-400 text-sm mb-1">{fact.date}</p>
                            {fact.type === 'quote' ? (
                                <>
                                    <p className="mb-5">{fact.context}</p>
                                    <blockquote className="border-l-4 border-l-gray-200 pl-4 font-normal text-sm">{fact.quote}</blockquote>
                                </>
                            ) : (
                                <p>{fact.content}</p>
                            )}
                            <div className="inline-flex gap-2 text-xs text-gray-400 mb-4">
                                <a href={fact.source} target="_blank" rel="noreferrer">Source</a>
                                <a href={fact.forumLink} target="_blank" rel="noreferrer">Discuss</a>
                            </div>
                            <TagGroup tags={fact.tags} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
