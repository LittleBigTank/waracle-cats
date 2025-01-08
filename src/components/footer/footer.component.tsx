const Footer = () => {
  const year = new Date().getFullYear().toString();

  return (
    <footer className="min-w-[320px] h-[60px] text-center text-white bg-dark-blue p-5">
      © Cats {year}
    </footer>
  );
}

export default Footer;