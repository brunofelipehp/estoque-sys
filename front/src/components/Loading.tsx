import { ThreeDots } from 'react-loader-spinner';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center rounded-full w-full h-16 border-green-200">
      <ThreeDots
        height="50"
        width="50"
        color="#6d28d9"
        ariaLabel="three-dots-loadings"
      />
    </div>
  )
}
