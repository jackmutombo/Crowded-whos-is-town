import * as React from 'react';

export interface ILightLabelProps {
  title:string
}

export default function LightLabel (props: ILightLabelProps) {
  return (
    <span className=' font-light text-sm mt-2'>{props.title}</span> 
  );
}
