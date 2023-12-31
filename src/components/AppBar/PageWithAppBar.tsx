import AppBar from './AppBar';

interface Props {
  component: React.ReactNode;
}

const PageWithAppBar: React.FC<Props> = ({ component }) => {
  return (
    <>
      <AppBar />
      {component}
    </>
  );
};

export default PageWithAppBar;
