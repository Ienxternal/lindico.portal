export function Button({ children, ...props }) {
  return (
    <button className="portal-button" {...props}>
      {children}
    </button>
  );
}
