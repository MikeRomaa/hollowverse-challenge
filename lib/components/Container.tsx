import React, { HTMLProps } from 'react';
import classNames from 'classnames';

export const Container: React.FC<HTMLProps<HTMLElement>> = ({ className, children }) => {
    return (
        <main className={classNames('px-5', className)}>
            {children}
        </main>
    );
};
