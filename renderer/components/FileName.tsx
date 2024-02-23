export const FileName = ({ text }) => {
  return <>{text.replace(/\.[^.]*$/, "")} </>;
};
