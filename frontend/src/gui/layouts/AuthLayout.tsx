import { useMemo } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Button, buttonVariants } from '@/gui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/gui/components/ui/card';
import { AppLogo } from '@/assets';
import { AUTH_PATH } from '@/routes/paths';

const AuthLayout = () => {
  const user = false;
  const { pathname } = useLocation();

  const title = useMemo(() => {
    if (pathname.includes(AUTH_PATH.login))
      return 'Login to your account';
    else if (pathname.includes(AUTH_PATH.register))
      return 'Welcome to AgriCare!'
  }, [pathname]);

  const description = useMemo(() => {
    if (pathname.includes(AUTH_PATH.login))
      return 'Welcome back. Please login to continue.';
    else if (pathname.includes(AUTH_PATH.register))
      return 'We are excited to have you in our community. Please fill out the information below to get started.'
  }, [pathname]);

  if (user) return <Navigate to={'/dashboard'} />;

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="text-center">
        <CardTitle className="flex flex-col items-center text-primary-green text-3xl">
          <AppLogo width={50} height={50} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Outlet />
      </CardContent>
      <CardFooter className="font-semibold text-sm flex justify-center gap-1">
        {pathname.includes(AUTH_PATH.login) ? (
          <>
            Don&apos;t have an account?
            <Link
              to={AUTH_PATH.register}
              className={buttonVariants({
                variant: 'link',
                className: 'text-primary-green !p-0'
                })
              }
            >Register here</Link>
          </>
        ) : pathname.includes(AUTH_PATH.register) ? (
          <>
            Already have an account?{' '}
            <Link
              to={AUTH_PATH.login}
              className={buttonVariants({
                variant: 'link',
                className: 'text-primary-green !p-0'
              })}
            >
              Login here
            </Link>
          </>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default AuthLayout;

