import { FormLogin } from "@/components/FormLogin";
import logo from '../assets/1.svg';

export const Login = () => {


  return (
    <div className="grid min-h-svh lg:grid-cols-2">


      <div className="">
        <FormLogin />
      </div>
      <div className=" relative hidden lg:block">
        <img
          src={logo}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div >
  );
}