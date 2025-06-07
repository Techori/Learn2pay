

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
);

export default Button;