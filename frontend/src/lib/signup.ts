export type SignupParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const signup = async (params: SignupParams) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: params }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
