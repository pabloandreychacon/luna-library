type AnchorProps = {
  text?: string;
}

const Anchor = ({ text = "Pablo Andrey Chacon Luna" }: AnchorProps) => {
  return (
    <a href="https://andreychaconresumereact.netlify.app/" target="_blank" rel="noopener noreferrer">
      <span>{text}</span>
    </a>
  );
};

export default Anchor;