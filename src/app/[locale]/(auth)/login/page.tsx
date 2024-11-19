import LoginForm from '@/components/forms/LoginForm';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/routing';

const Login = () => {
  return (
    <PageWrapper>
      <div className="flex h-screen">
        <div className="m-auto w-full p-10 sm:w-[420px] sm:rounded-[25px] sm:shadow-lg">
          <div className="mb-3 flex flex-col gap-5 text-center">
            {/* Title  */}
            <h4 className="mb-1 text-[23px] font-semibold">로그인</h4>
            {/* Not a member yet? */}
            <h5 className="text-[15px] font-semibold tracking-[-1px]">아직 회원이 아니세요?</h5>
            {/* Join the membership */}
            <Link
              href={'/register'}
              className="flex h-11 items-center justify-center rounded-md border-2 border-border font-semibold"
            >
              회원가입
            </Link>

            {/* OR  */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-full"></span>
              <span>OR</span>
              <span className="h-[1px] w-full"></span>
            </div>
          </div>
          {/* Form  */}
          <LoginForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
