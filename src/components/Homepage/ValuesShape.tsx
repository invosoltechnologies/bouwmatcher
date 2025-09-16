import Image from 'next/image';

const valuesData = [
  {
    id: 1,
    icon: '/icons/values/Betrouwbaarheid.svg',
    title: 'Betrouwbaarheid',
    description: 'Wij staan voor heldere contracten zonder verborgen valkuilen of hoge opslagkosten.',
    position: 'top-left'
  },
  {
    id: 2,
    icon: '/icons/values/Transparantie.svg',
    title: 'Transparantie',
    description: 'Ontvang je geen leuk? Dan betaal je ook niets. Zo weet je altijd waar je aan toe bent.',
    position: 'top-right'
  },
  {
    id: 3,
    icon: '/icons/values/Eerlijkheid.svg',
    title: 'Eerlijkheid',
    description: 'Geen loze beloftes of waargaranties. Bij ons sta jij altijd centraal.',
    position: 'bottom-left'
  },
  {
    id: 4,
    icon: '/icons/values/Doelgericht.svg',
    title: 'Doelgericht',
    description: 'Vertel ons wat je zoekt, wij regelen de rest. Het gemak van een betrouwbare bouwpartner.',
    position: 'bottom-right'
  }
];

export default function ValuesShape() {
  return (
    <div className="relative flex justify-center items-center max-w-4xl mx-auto px-4">
      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-x-[35px] gap-y-[27px] relative z-10">
        {valuesData.map((value) => {
          const isBottomCard = value.position.includes('bottom');

          return (
            <div
              key={value.id}
              className={`relative w-[333px] h-[291px] rounded-[20px] p-6 flex flex-col gap-0.5 ${
                isBottomCard ? 'flex-col-reverse' : ''
              } ${value.id % 2 === 0 ? 'items-end' : 'items-start'}`}
              style={{
                background:
                  value.id % 2 === 0
                    ? 'linear-gradient(90deg, rgba(10, 178, 126, 0.25) 0%, rgba(2, 58, 162, 0.25) 100%)'
                    : 'linear-gradient(90deg, rgba(2, 58, 162, 0.25) 0%, rgba(10, 178, 126, 0.25) 100%)',
                boxShadow: '0px 16px 40px 0px #2929291F',
              }}
            >
              {/* Content based on position */}
              {/* Icon and Title Row */}
              <div
                className={`flex items-center gap-3 mb-4 ${
                  value.id % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <Image
                  src={value.icon}
                  alt={value.title}
                  width={76}
                  height={76}
                  className='w-[76px] h-[76px]'
                />

                <h3 className='text-lg font-bold text-gray-900'>
                  {value.title}
                </h3>
              </div>
              {/* Description */}
              <p
                className={`text-sm text-gray-700 leading-relaxed max-w-44 text-wrap ${
                  value.id % 2 === 0 ? 'text-right' : 'text-left'
                }  `}
              >
                {value.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Center Circle */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative rounded-full border border-gray-200"
          style={{
            width: '231px',
            height: '231px',
            background: 'linear-gradient(90deg, rgba(2, 58, 162, 0.34) 0%, #0AB27E 50%, rgba(2, 58, 162, 0.23) 100%)'
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full flex items-center justify-center"
            style={{
              width: '176px',
              height: '176px',
              boxShadow: '0px 10px 15px 0px #0000001A'
            }}
          >
            <div className="text-center text-white">
              <div className="text-sm font-medium leading-tight">
                Jouw zekerheid<br />
                in de bouw.
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}