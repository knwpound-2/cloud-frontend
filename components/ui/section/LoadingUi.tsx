import { Spinner } from '../Spinner';

export default function LoadingUi({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='flex flex-col justify-center text-center'>
      <Spinner />
      <h3 className='text-xl font-bold mt-6'>{title}</h3>
      <p className='text-xs text-gray-400 mt-1'>{description}</p>
    </div>
  );
}
