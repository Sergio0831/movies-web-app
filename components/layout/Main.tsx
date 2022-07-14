import Nav from './Nav';

type MainProps = {
  children?: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return (
    <main>
      <Nav />
      {children}
    </main>
  );
};
export default Main;
