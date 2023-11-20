import * as React from 'react';

export interface IInfoCardContainerProps {
    title: string;
    children: any
}

export default function InfoCardContainer(props: IInfoCardContainerProps) {
    return (
        <div className='border p-4 mt-12 rounded-lg'>
            <div className='flex justify-center mb-10'><span>{props.title}</span></div>

            <div className='grid grid-cols-1 ml-8'>
                {props.children}

            </div>


        </div>
    );
}
