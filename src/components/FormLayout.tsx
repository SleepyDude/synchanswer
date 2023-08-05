type FormLayoutProps = {
  children: string | JSX.Element | JSX.Element[];
};

function FormLayout({ children }: FormLayoutProps) {
  return (
    <div className="border border-black w-96 flex flex-col ">{children}</div>
  );
}

export default FormLayout;
