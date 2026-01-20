import AccountNav from "./account-nav";

export default function AccountLayout({ locale, children }) {
  return (
    <section className="w-full block py-[15px_30px] xl:py-[20px_60px] 2xl:py-[40px_100px]">
      <div className="container">
        <div className="flex flex-wrap -mx-1 xl:-mx-1 2xl:-mx-1.2 [&>*]:p-1 xl:[&>*]:p-1 2xl:[&>*]:p-1.2">
          <div className="w-full sm:w-[200px] xl:w-[240px] 2xl:w-[268px] 3xl:w-[330px]">
            <AccountNav locale={locale} />
          </div>

          <div className="w-full sm:w-[calc(100%-200px)] xl:w-[calc(100%-240px)] 2xl:w-[calc(100%-268px)] 3xl:w-[calc(100%-330px)] max-sm:mb-2">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
