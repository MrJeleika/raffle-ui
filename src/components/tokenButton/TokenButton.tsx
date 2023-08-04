interface Props {
  setToken: (value: any) => void;
  token: `0x${string}`;
  color: string;
  children: React.ReactNode;
}

export const TokenButton = ({ setToken, token, color, children }: Props) => {
  return (
    <button
      onClick={() => setToken(token)}
      className={`text-bold mr-5 rounded border-2 border-black bg-${color} px-4 py-2 text-black`}
    >
      {children}
    </button>
  );
};
