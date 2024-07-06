import Link from "next/link";

interface ContactBtnProps {
  text?: string;
}

const ContactBtn: React.FC<ContactBtnProps> = ({ text }) => {
  return (
    <Link
      href="/contact"
      className="btn btn-sm flex items-center cursor-pointer"
    >
      {text ? text : "Contact me"}
    </Link>
  );
};

export default ContactBtn;
