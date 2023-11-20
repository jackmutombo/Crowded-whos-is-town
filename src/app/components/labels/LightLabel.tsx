type Props = {
    title: string;
}
export default function LightLabel({title}:Props) {
  return <span className=' font-light text-sm mt-2'>{title}</span> 
}