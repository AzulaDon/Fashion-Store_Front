const Strip = ({ items = [] }) => {
  const content = [...items, ...items];

  return (
    <div className="strip">
      <div className="strip-inner">
        {content.map((text, i) => (
          <span key={i}>
            {text} &nbsp;·&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export default Strip;