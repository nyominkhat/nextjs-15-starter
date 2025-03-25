import RegisterForm from '@/components/forms/RegisterForm';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/routing';

const Register = () => {
  return (
    <PageWrapper className="flex h-screen">
      <div className="m-auto w-full p-10 sm:w-[420px] sm:rounded-[25px] sm:shadow-lg">
        <div className="mb-3 flex flex-col gap-5 text-center">
          {/* Title  */}
          <h4 className="mb-1 text-[23px] font-semibold">Register</h4>

          <Link
            href={'/login'}
            className="flex h-11 items-center justify-center rounded-md border-2 border-border font-semibold"
          >
            Have any account?
          </Link>

          {/* OR  */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-full"></span>
            <span>OR</span>
            <span className="h-[1px] w-full"></span>
          </div>
        </div>
        {/* Form  */}
        <RegisterForm />
      </div>
    </PageWrapper>
  );
};

export default Register;
