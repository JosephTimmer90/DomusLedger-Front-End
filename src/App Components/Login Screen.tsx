import { useBoundStore } from "../store";

function LogInScreen() {
  const userName = useBoundStore((store) => store.userName);
  const passWord = useBoundStore((store) => store.passWord);
  const updateUserName = useBoundStore((store) => store.updateUserName);
  const updatePassWord = useBoundStore((store) => store.updatePassWord);

  return (
    <>
      <h1>Login Here</h1>
      <form className="m-15 border-solid border-white border-2 flex flex-col p-5 items-center">
        <label htmlFor="username" className="text-white">
          User Name
        </label>
        <input
          id="username"
          type="text"
          className="border-solid border-white border-2 w-8/10 text-center"
          onChange={(event) => updateUserName(event.target.value)}
          value={userName}
        />
        <label htmlFor="password" className="mt-5">
          Password
        </label>
        <input
          id="password"
          type="text"
          className="border-solid border-white border-2 w-8/10 text-center"
          onChange={(e) => updatePassWord(e.target.value)}
          value={passWord}
        />
        <button
          type="submit"
          className="mt-5 border-solid border-white border-2 p-2"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default LogInScreen;
