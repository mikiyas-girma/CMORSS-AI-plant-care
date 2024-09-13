import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/gui/components/ui/button";
import { Checkbox } from "@/gui/components/ui/checkbox";
import { Input } from "@/gui/components/ui/input";
import { Label } from "@/gui/components/ui/label";
import DangerWrapper from "@/gui/components/common/DangerWrapper";
import { cn } from "@/lib/utils";
import { AUTH_PATH } from "@/routes/paths";
import { SignInFormData } from "@/types/form";
import { signinValidation } from "@/lib/formsValidation";

/**
 * Sign in Route Component
 * @returns JSX Component for the page.
 */
const SignIn = () => {
  const [errors, setErrors] = useState<{[key in keyof SignInFormData]: string} | null>(null);
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = signinValidation(formData);

    if (Object.values(validationErrors).find(e => e !== '')) {
      setErrors({...validationErrors});
      return;
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email <DangerWrapper>*</DangerWrapper></Label>
        <Input autoComplete="email" type="email" id="email" placeholder="email" onChange={handleChange}/>
        {errors?.email && <DangerWrapper>{errors.email}</DangerWrapper>}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Password <DangerWrapper>*</DangerWrapper></Label>
        <Input autoComplete="current-password" type="password" id="password" placeholder="password" onChange={handleChange}/>
        {errors?.password && <DangerWrapper>{errors.password}</DangerWrapper>}
      </div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            onClick={() => {
              setFormData({...formData, remember: !formData.remember});
            }}
          />
          <Label htmlFor="remember">
            Remember Me
          </Label>
        </div>
        <Link to={AUTH_PATH.forgotPassword} className={buttonVariants({variant: 'link'})}>Forgot Password</Link>
      </div>
      <div className="flex flex-col items-stretch gap-2">
        <Button
          size="lg"
          type="submit"
          className="!bg-primary-green hover:!bg-opacity-85 uppercase"
        >
          Login to your account
        </Button>
        <Link
          to={"#"}
          className={cn(buttonVariants(
            {size: 'lg'}),
            "!bg-secondary-blue hover:!bg-opacity-85 uppercase")
          }
        >
          Sign in with google
        </Link>
      </div>
    </form>
  );
};

export default SignIn;
