import React, { HTMLProps } from 'react';
import classNames from 'classnames';
import { Tag } from '~/lib/utils/types';

export const Badge: React.FC<HTMLProps<HTMLSpanElement>> = ({ children }) => (
    <span className="bg-gray-200 px-5 py-1 rounded-lg shadow-lg text-xs">
        {children}
    </span>
);

interface TagGroupProps extends HTMLProps<HTMLDivElement> {
    tags?: Tag[];
}

export const TagGroup: React.FC<TagGroupProps> = ({ tags, className }) => (
    <div className={classNames('flex flex-wrap gap-2', className)}>
        {tags?.map((tag, i) => (
            <Badge key={i}>{tag.tag.name}</Badge>
        ))}
    </div>
);
