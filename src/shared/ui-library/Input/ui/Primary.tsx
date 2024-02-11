import React, { FC, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Primary: FC<Props> = ({className, ...props}) => {
    return (
        <input type="text" className={`p-3 w-full disabled:opacity-[.7] bg-[transparent] rounded-m border-m desktop:text-DBody-L phone:text-MBody-L border-white ${className}`} {...props} />
    );
};

export default Primary;