import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const dataV = {
  address1: "One Apple Park Way",
  city: "Cupertino",
  state: "CA",
  zip: "95014",
  country: "United States",
  phone: "408 996 1010",
  website: "https://www.apple.com",
  industry: "Consumer Electronics",
  industryKey: "consumer-electronics",
  industryDisp: "Consumer Electronics",
  sector: "Technology",
  sectorKey: "technology",
  sectorDisp: "Technology",
  longBusinessSummary: `Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company 
  offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. In addition, the company offers various services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App 
  Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was founded in 1976 and is headquartered in Cupertino, California.`,
  fullTimeEmployees: 161000,
};

const CardInformation = () => {
  return (
    <>
      <div className="px-6 py-4">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>{dataV.industryDisp}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-500 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="text-gray-700 text-base">
                  {dataV.longBusinessSummary}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          Address: {dataV.address1}, {dataV.city}, {dataV.state} {dataV.zip},{" "}
          {dataV.country}
        </p>
        <p className="text-gray-700 text-base">Phone: {dataV.phone}</p>
        <p className="text-gray-700 text-base">
          Website:{" "}
          <a href={dataV.website} className="text-blue-500">
            {dataV.website}
          </a>
        </p>
        <p className="text-gray-700 text-base">Sector: {dataV.sectorDisp}</p>
        <p className="text-gray-700 text-base">
          Industry: {dataV.industryDisp}
        </p>
        <p className="text-gray-700 text-base">
          Employees: {dataV.fullTimeEmployees}
        </p>
      </div>
    </>
  );
};

export default CardInformation;
