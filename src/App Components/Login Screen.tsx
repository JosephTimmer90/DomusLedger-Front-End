import { useBoundStore } from "../store";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Min-length: 6'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LogInScreen({ setTokens }: { setTokens: (tokens: any) => void}) {
  const userName = useBoundStore((store) => store.userName);
  const passWord = useBoundStore((store) => store.passWord);
  const failedAuthMessage = useBoundStore((store) => store.failedAuthMessage);
  const updateUserName = useBoundStore((store) => store.updateUserName);
  const updatePassWord = useBoundStore((store) => store.updatePassWord);
  const updateFailedAuthMessage = useBoundStore((store) => store.updateFailedAuthMessage);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      setTokens(result.tokens);
      navigate('/dashboard');
    } else{
      updateFailedAuthMessage('Login credentials could not be validated.')
    }
  }

  return (
    <>
      <h1>Login Here Now</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="m-15 border-solid border-white border-2 flex flex-col p-5 items-center">
        <div className="w-8/10 m-3" >
          <label htmlFor="username" className="text-white m-5">
          Email:
          </label>
          <input
            {...register('email')}
            id="username"
            type="text"
            className="border-solid border-white border-2 w-3/10 text-center"
            onChange={(event) => updateUserName(event.target.value)}
            value={userName}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="w-8/10 m-3">
          <label htmlFor="password" className="text-white m-5">
            Password:
          </label>
          <input
            {...register('password')}
            id="password"
            type="password"
            className="border-solid border-white border-2 w-3/10 text-center"
            onChange={(e) => updatePassWord(e.target.value)}
            value={passWord}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="m-5 border-solid border-white border-2 p-2"
          disabled={isSubmitting}
        >
          Login
        </button>
        <p className="text-red-500">{failedAuthMessage}</p>
      </form>
    </>
  );
}

export default LogInScreen;
