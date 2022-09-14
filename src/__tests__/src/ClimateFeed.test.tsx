import React from 'react';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import * as reactQuery from 'react-query';
import ClimateFeed from '../../pages/ClimateFeed';
import { QueryClient, QueryClientProvider } from 'react-query';

window.scrollTo = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/climate-feed',
    },
  }),
}));

const dummyData = {
  climateEffects: [
    {
      effectDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Enim eu turpis egestas pretium aenean pharetra. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Proin sagittis nisl rhoncus mattis. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Ultrices in iaculis nunc sed augue lacus viverra vitae. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Eget est lorem ipsum dolor sit amet consectetur. Quis lectus nulla at volutpat. Urna molestie at elementum eu facilisis. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.\n\nNon quam lacus suspendisse faucibus. Nunc consequat interdum varius sit amet mattis vulputate. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Leo urna molestie at elementum. Viverra tellus in hac habitasse platea dictumst. Enim ut tellus elementum sagittis vitae et leo duis. Nunc sed augue lacus viverra vitae congue eu. Vivamus at augue eget arcu. Tellus cras adipiscing enim eu turpis egestas pretium. Luctus accumsan tortor posuere ac ut consequat semper.',
      effectId: 'RnbPKhyIQNnShkRKHqGrGm',
      effectScore: 77.44000000000001,
      effectShortDescription:
        'The air in the atmosphere is warming leading to more moisture held in clouds and increasing the frequency of heatwaves and warm days and nights. These are causing more evaporation and extreme rainfall. Both of these, in addition to warming oceans driving stronger hurricanes with larger storm surges, are causing the continued increases in flooding of land and property. More and more land and property are getting inundated with water.',
      effectSolutions: [
        {
          imageUrl:
            'https://62e528761d0685343e1c-f3d1b99a743ffa4142d9d7f1978d9686.ssl.cf2.rackcdn.com/files/8/width668/aapone-20110307000303779168-australia-weather-rain-record-files-original.jpg',
          longDescription: 'No long desc available at present',
          shortDescription:
            'Building on higher ground prevents flood damage to property as flooding continues to intensify due to climate change.',
          solutionTitle:
            'avoid building on land that is or will become a floodplain',
          solutionType: 'adaptation',
        },
        {
          imageUrl: null,
          longDescription:
            'Insulation impedes unwanted airflow in or out of buildings. In new construction or retrofits, it makes heating and cooling more energy efficient, with lower emissions. Retrofitting buildings with insulation is a cost-effective solution for reducing energy required for heating and cooling. If annually, 1.6-2 percent of existing residential and commercial buildings in temperate and tropical countries install insulation increasingly with low carbon materials, 17-19 gigatons of emissions can be avoided at an implementation cost of $751-831 billion. Over the lifetime of the building, heating and cooling savings could be $21- $24 trillion.',
          shortDescription:
            'Insulation impedes unwanted airflow in or out of buildings. In new construction or retrofits, it makes heating and cooling more energy efficient, with lower emissions.',
          solutionTitle: 'insulating buildings better',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription:
            'Fluorinated gases have a potent greenhouse effect and are widely used as refrigerants. Managing leaks and disposal of these chemicals can avoid emissions in buildings and landfills. Substantial emissions reductions could be achieved through the adoption of practices to (1) avoid leaks from refrigerants and (2) destroy refrigerants at end of life, both after the adoption of alternatives to HFC refrigerants. Over thirty years, an increase of over 79% percent of refrigerants that may be released can be contained, avoiding emissions equivalent to 57.8 gigatons of carbon dioxide. Although some revenue can be generated from resale of recovered refrigerant gases, the costs to establish and operate recovery, destruction, and leak avoidance outweigh the financial benefit—meaning that refrigerant management, as modeled, could incur a net cost of $629.4 billion by 2050.',
          shortDescription:
            'Fluorinated gases have a potent greenhouse effect and are widely used as refrigerants. Managing leaks and disposal of these chemicals and adopting alternative refrigerants can avoid emissions in buildings and landfills.',
          solutionTitle: 'managing refrigerants better',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription:
            'Concentrated solar power uses sunlight as a heat source. Arrays of mirrors concentrate incoming rays onto a receiver, to heat fluid, produce steam, and turn turbines. If this solution rose to 5.9-7.3 percent of world electricity generation by 2050, 18.6-24.0 gigatons of greenhouse gases emissions could be avoided.',
          shortDescription:
            'Concentrated solar power uses sunlight as a heat source. Arrays of mirrors concentrate incoming rays onto a receiver to heat fluid, produce steam, and turn turbines.',
          solutionTitle: 'producing electricity via concentrated solar power',
          solutionType: 'mitigation',
        },
      ],
      effectTitle: 'increase in flooding of land and property',
      effectSpecificMythIRIs: [
        'RCqODufKJse3xkgAny5v5fI',
        'RXlELjsOUaVbJqmvO91WFL',
      ],
      imageUrl:
        'https://api.creativecommons.engineering/v1/thumbs/1dc085e5-a90e-4f3e-ae79-17d8e209516c',
    },
    {
      effectDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Enim eu turpis egestas pretium aenean pharetra. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Proin sagittis nisl rhoncus mattis. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Ultrices in iaculis nunc sed augue lacus viverra vitae. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Eget est lorem ipsum dolor sit amet consectetur. Quis lectus nulla at volutpat. Urna molestie at elementum eu facilisis. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.\n\nNon quam lacus suspendisse faucibus. Nunc consequat interdum varius sit amet mattis vulputate. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Leo urna molestie at elementum. Viverra tellus in hac habitasse platea dictumst. Enim ut tellus elementum sagittis vitae et leo duis. Nunc sed augue lacus viverra vitae congue eu. Vivamus at augue eget arcu. Tellus cras adipiscing enim eu turpis egestas pretium. Luctus accumsan tortor posuere ac ut consequat semper.',
      effectId: 'R8t0oNsG3WgnupXsBVSjMHZ',
      effectScore: 71.60000000000001,
      effectShortDescription:
        'The warming air in the atmosphere is causing more heatwaves. This combined with warming days and nights is causing increases in suicide. Rising temperature and climate change are not direct motivations for suicide. Instead, temperature and climate increase the risk of suicide by affecting the likelihood that an individual situation leads to an attempt at self-harm. More people are triggered to intentionally cause their own death.',
      effectSolutions: [
        {
          imageUrl: null,
          longDescription: 'No long desc available at present',
          shortDescription:
            'The negative effects of climate change can increase suicide rates. More funding for mental health services and education can help prevent suicides.',
          solutionTitle: 'increase in funding for suicide prevention',
          solutionType: 'adaptation',
        },
        {
          imageUrl: null,
          longDescription:
            'Insulation impedes unwanted airflow in or out of buildings. In new construction or retrofits, it makes heating and cooling more energy efficient, with lower emissions. Retrofitting buildings with insulation is a cost-effective solution for reducing energy required for heating and cooling. If annually, 1.6-2 percent of existing residential and commercial buildings in temperate and tropical countries install insulation increasingly with low carbon materials, 17-19 gigatons of emissions can be avoided at an implementation cost of $751-831 billion. Over the lifetime of the building, heating and cooling savings could be $21- $24 trillion.',
          shortDescription:
            'Insulation impedes unwanted airflow in or out of buildings. In new construction or retrofits, it makes heating and cooling more energy efficient, with lower emissions.',
          solutionTitle: 'insulating buildings better',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription: 'No long desc available at present',
          shortDescription:
            'Setting a limit on emissions and creating a market for trading allowances can drive down emissions by making it more expensive for industries to pollute.',
          solutionTitle: 'enact cap and trade policy',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription:
            'High-speed rail offers an alternative to trips otherwise made by car or airplane. It requires special, designated tracks, but can dramatically curtail emissions.',
          shortDescription:
            'High-speed rail offers an alternative to trips otherwise made by car or airplane. It can dramatically curtail emissions.',
          solutionTitle: 'using high-speed rail',
          solutionType: 'mitigation',
        },
      ],
      effectTitle: 'increase in suicide',
      effectSpecificMythIRIs: [
        'RCqODufKJse3xkgAny5v5fI',
        'RXlELjsOUaVbJqmvO91WFL',
      ],
      imageUrl:
        'https://im.indiatimes.in/media/content/2016/Jun/netsafe%20org_1466062085.jpg',
    },
    {
      effectDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Enim eu turpis egestas pretium aenean pharetra. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Proin sagittis nisl rhoncus mattis. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Ultrices in iaculis nunc sed augue lacus viverra vitae. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Eget est lorem ipsum dolor sit amet consectetur. Quis lectus nulla at volutpat. Urna molestie at elementum eu facilisis. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.\n\nNon quam lacus suspendisse faucibus. Nunc consequat interdum varius sit amet mattis vulputate. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Leo urna molestie at elementum. Viverra tellus in hac habitasse platea dictumst. Enim ut tellus elementum sagittis vitae et leo duis. Nunc sed augue lacus viverra vitae congue eu. Vivamus at augue eget arcu. Tellus cras adipiscing enim eu turpis egestas pretium. Luctus accumsan tortor posuere ac ut consequat semper.',
      effectId: 'RDavliTi6W93xwahwtUnUtG',
      effectScore: 71.60000000000001,
      effectShortDescription:
        'The continued rise in frequency of warm days and night in addition to heatwaves are driving increases in physical violence. More people are harming others through acts of physical aggression.',
      effectSolutions: [
        {
          imageUrl:
            'https://62e528761d0685343e1c-f3d1b99a743ffa4142d9d7f1978d9686.ssl.cf2.rackcdn.com/files/8/width668/aapone-20110307000303779168-australia-weather-rain-record-files-original.jpg',
          longDescription: 'No long desc available at present',
          shortDescription:
            'Building on higher ground prevents flood damage to property as flooding continues to intensify due to climate change.',
          solutionTitle:
            'avoid building on land that is or will become a floodplain',
          solutionType: 'adaptation',
        },
        {
          imageUrl: null,
          longDescription:
            'Rooftop solar panels are one example of distributed solar photovoltaic systems. Whether grid-connected or part of standalone systems, they offer hyper-local, clean electricity generation. Widespread adoption of distributed solar panels by 2050 could avoid 27-69 gigatons of greenhouse gases emissions. With implementation costs reducing by the day, over the lifetime of distributed photovoltaic technologies, it could save $7.9-13.5 trillion in associated operation and maintenance and fuel costs.',
          shortDescription:
            'Rooftop solar panels are one example. Whether grid-connected or part of standalone systems, they offer hyper-local, clean electricity generation and avoid emissions.',
          solutionTitle:
            'producing electricity via distributed solar photovoltaics',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription:
            'Thermostats are mission control for space heating and cooling. Smart thermostats use algorithms and sensors to become more energy efficient over time, lowering emissions. Project Drawdown projects that smart thermostats could grow from 3 percent to 58-63 percent of households with Internet access by 2050. In this scenario, 1,453-1,589 million homes would have them. Reduced energy use could avoid 7.0-7.4 gigatons of carbon dioxide emissions for an investment of $155-172 billion. Return on investment is high: smart thermostats can save their owners $1.8-2.1 trillion on utility bills over the lifetime of the units.',
          shortDescription:
            'Thermostats control space heating and cooling. Smart thermostats use algorithms and sensors to become more energy efficient over time, lowering emissions and saving money.',
          solutionTitle: 'installing smart thermostats',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription:
            'Multistrata agroforestry systems mimic natural forests in structure. Multiple layers of trees and crops achieve high rates of both carbon sequestration and food production. Multistrata agroforestry can be integrated into some existing agricultural systems; others can be converted or restored to it. If adopted on another 39-66 million hectares by 2050, from 100 million hectares currently, 11.3-20.4 gigatons of carbon dioxide could be sequestered. Average sequestration rate of 4.45 tons of carbon per hectare per year is strong, as is financial return: $1.7-3 trillion lifetime, on a $54-92 billion initial investment and lifetime operational cost of $142.9-245.4.',
          shortDescription: 'No short desc available at present',
          solutionTitle: 'increase in multistrata agroforestry',
          solutionType: 'mitigation',
        },
      ],
      effectTitle: 'increase in physical violence',
      effectSpecificMythIRIs: [
        'RCqODufKJse3xkgAny5v5fI',
        'RXlELjsOUaVbJqmvO91WFL',
      ],
      imageUrl:
        'https://i0.pickpik.com/photos/744/359/676/fist-strength-anger-tear-preview.jpg',
    },
    {
      effectDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Enim eu turpis egestas pretium aenean pharetra. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Proin sagittis nisl rhoncus mattis. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Ultrices in iaculis nunc sed augue lacus viverra vitae. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Eget est lorem ipsum dolor sit amet consectetur. Quis lectus nulla at volutpat. Urna molestie at elementum eu facilisis. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.\n\nNon quam lacus suspendisse faucibus. Nunc consequat interdum varius sit amet mattis vulputate. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Leo urna molestie at elementum. Viverra tellus in hac habitasse platea dictumst. Enim ut tellus elementum sagittis vitae et leo duis. Nunc sed augue lacus viverra vitae congue eu. Vivamus at augue eget arcu. Tellus cras adipiscing enim eu turpis egestas pretium. Luctus accumsan tortor posuere ac ut consequat semper.',
      effectId: 'RO1J1OifvuO602qTIrSXdB',
      effectScore: 60.040000000000006,
      effectShortDescription:
        'Lower quality air from increasing toxic air pollutants in addition to the increasing amount of pollen released by plants due to higher levels of CO2 are both driving increases in asthma complications. Individuals with asthma are experiencing more frequent or worsened attacks and symptoms.',
      effectSolutions: [
        {
          imageUrl: null,
          longDescription: 'No long desc available at present',
          shortDescription:
            'Using goats to graze on overgrown land to clear brush and tall grass reduces fuel for wildfires. This alternative to herbicides or heavy machinery also reduces emissions and is kinder to the climate and environment.',
          solutionTitle: 'increase in goats clearing brush',
          solutionType: 'adaptation',
        },
        {
          imageUrl: null,
          longDescription:
            'Improved clean cookstoves can address the pollution from burning wood or biomass in traditional stoves. Using various technologies, they reduce emissions and protect human health. As of 2018, clean cookstoves were used by over 53% of families in developing regions with the rest using open wood or charcoal fires for cooking, with concomitant health and environmental effects. If policies for promoting clean cooking worldwide are aggressively implemented, guided by the UN Sustainable Development Goal (SDG) of universal access to clean energy, reductions in emissions can amount to 31-73 gigatons of carbon dioxide equivalents at a net cost of $128-$264 billion. These stoves do raise cooking operating costs however by $2.0-$4.2 trillion over the stove lifetimes considering that many families collect firewood for free or buy cheap fuels today. These results include the reduction of black carbon, the second more impactful climate pollutant, by 8-20 gigatons of carbon dioxide equivalents. The additional benefits to the health of millions of households are not calculated here by Project Drawdown.',
          shortDescription:
            'Improved clean cookstoves can address the pollution from burning wood or biomass in traditional stoves. Using various technologies, they reduce emissions and protect human health.',
          solutionTitle: 'using improved clean cookstoves',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription: 'No long desc available at present',
          shortDescription:
            'Charging people and companies a carbon tax on emissions can be made more popular by redistributing the income back to taxpayers.',
          solutionTitle: 'enact carbon tax policy (revenue neutral)',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription:
            'Almost all temperate forests have been altered in some way—timbered, converted to agriculture, disrupted by development. Restoring them sequesters carbon in biomass and soil. Project Drawdown projects that temperate forest restoration will expand to an additional 92-128 million hectares through protecting currently degraded land and allowing natural regrowth to occur. Though this is much lower than the available area for tropical forest restoration, it still sequesters 19.4-27.9 gigatons of carbon dioxide by 2050.',
          shortDescription:
            'Almost all temperate forests have been altered in some way—timbered, converted to agriculture, disrupted by development. Restoring them sequesters carbon in biomass and soil.',
          solutionTitle: 'increase in restoration of temperate forests',
          solutionType: 'mitigation',
        },
      ],
      effectTitle: 'increase in asthma complications',
      effectSpecificMythIRIs: [
        'RCqODufKJse3xkgAny5v5fI',
        'RXlELjsOUaVbJqmvO91WFL',
      ],
      imageUrl:
        'https://live.staticflickr.com/3382/3630262585_f9e666b8bb_b.jpg',
    },
    {
      effectDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Enim eu turpis egestas pretium aenean pharetra. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Proin sagittis nisl rhoncus mattis. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Ultrices in iaculis nunc sed augue lacus viverra vitae. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Eget est lorem ipsum dolor sit amet consectetur. Quis lectus nulla at volutpat. Urna molestie at elementum eu facilisis. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.\n\nNon quam lacus suspendisse faucibus. Nunc consequat interdum varius sit amet mattis vulputate. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Leo urna molestie at elementum. Viverra tellus in hac habitasse platea dictumst. Enim ut tellus elementum sagittis vitae et leo duis. Nunc sed augue lacus viverra vitae congue eu. Vivamus at augue eget arcu. Tellus cras adipiscing enim eu turpis egestas pretium. Luctus accumsan tortor posuere ac ut consequat semper.',
      effectId: 'RBqibfoxaYmRDDRiBzSVS0N',
      effectScore: 58.08000000000001,
      effectShortDescription:
        'The increasing frequency of heatwaves is causing more individuals to suffer from heat stroke. The amount of individuals that are overheating as a result to prolonged exposure to high temperatures is increasing. From 2008-2018 the rate of heat stroke grew by 60% for active-duty service members of the US Military.',
      effectSolutions: [
        {
          imageUrl: null,
          longDescription: 'No long desc available at present',
          shortDescription: 'No short desc available at present',
          solutionTitle: 'increase in carbon capture',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription:
            "When people share common origins, destinations, or stops en route, they can ride together. Carpooling uses seats and fuel more efficiently, cutting emissions. Project Drawdown's projection for carpooling focuses on approaches to increase global urban car occupancy, the number of passengers in each car trip. They assume that urban car occupancy can rise from 1.57 in 2018 to 1.75 or 2.0 by 2050, assuming 3 passengers per carpool trip. Carpooling has no implementation costs and can reduce emissions by 4.2-7.7 gigatons of carbon dioxide while saving $2.8-$5.2 trillion in operating costs.",
          shortDescription:
            'Sharing car rides with friends or colleagues reduces the number of cars on the road. Carpooling can reduce emissions by 4.2 - 7.7 gigatons of carbon dioxide.',
          solutionTitle: 'carpooling',
          solutionType: 'mitigation',
        },
        {
          imageUrl: null,
          longDescription:
            'Solar photovoltaics can be used at utility-scale—with hundreds or thousands of panels—to tap the sun’s clean, free fuel and replace fossil-fuel electricity generation. Solar is now a cheaper source of electricity than natural gas or coal. The significant increase of ultility-scale solar panels could avoid 44-119 gigatons of greenhouse gases emissions by 2050 if it represents 20-25% of the electricity generation mix (currently only 1% of the mix).',
          shortDescription:
            'Solar photovoltaics can be used at utility-scale — with hundreds or thousands of panels — to tap the sun’s clean free fuel and replace fossil-fuel electricity generation. Solar is now a cheaper source of electricity than natural gas or coal.',
          solutionTitle:
            'producing electricity via utility-scale solar photovoltaics',
          solutionType: 'mitigation',
        },
        {
          imageUrl:
            'https://c.pxhere.com/photos/36/9f/solar_panels_installation_workers_array_power_sun_electricity_energy-1028805.jpg!d',
          longDescription: 'No long desc available at present',
          shortDescription:
            'Government investment can create jobs that reduce emissions, such as positions in agriculture, manufacturing, R&D, administrative, and service activities aimed at substantially preserving or restoring environmental quality.',
          solutionTitle: 'establish a federal green jobs program',
          solutionType: 'mitigation',
        },
      ],
      effectTitle: 'increase in heat stroke',
      effectSpecificMythIRIs: [
        'RCqODufKJse3xkgAny5v5fI',
        'RXlELjsOUaVbJqmvO91WFL',
      ],
      imageUrl:
        'https://www.stripes.com/polopoly_fs/1.578924.1556551744!/image/image.jpg_gen/derivatives/landscape_900/image.jpg',
    },
  ],
};

const dummyMyths = [
  {
    faultyLogicDescription:
      'Jumping to conclusions\nPast climate change actually sends the opposite message than what the myth concludes.',
    iri: 'R8ZhofBtOtoHDSFtEhoLGir',
    mythClaim:
      "Climate's changed before\n\nClimate is always changing.thousand years, and there have been previous periods that appear to have been warmer than the present despite CO2 levels being lower than they are now. More recently, we have had the medieval warm period and the little ice age. (from Richard Lindzen)",
    mythRebuttal:
      'Greenhouse gasses, principally CO2, have controlled most ancient climate changes. This time around humans are the cause, mainly by our CO2 emissions.',
    mythSources: [
      'https://skepticalscience.com/climate-change-little-ice-age-medieval-warm-period.htm',
    ],
    mythTitle: 'Climate has changed before',
    mythVideos: ['https://youtu.be/H5kejSYPD7U'],
  },
  {
    faultyLogicDescription:
      'Jumping to conclusions\nPast climate change actually sends the opposite message than what the myth concludes.',
    iri: 'R8ZhofBtOtoHDSFtEhoLGir',
    mythClaim:
      "Climate's changed before\n\nClimate is always changing. We have had ice ages and warmer periods when alligators were found in Spitzbergen. Ice ages have occurred in a hundred thousand year cycle for the last 700 thousand years, and there have been previous periods that appear to have been warmer than the present despite CO2 levels being lower than they are now. More recently, we have had the medieval warm period and the little ice age. (from Richard Lindzen)",
    mythRebuttal:
      'Greenhouse gasses, principally CO2, have controlled most ancient climate changes. This time around humans are the cause, mainly by our CO2 emissions.',
    mythSources: [
      'https://skepticalscience.com/climate-change-little-ice-age-medieval-warm-period.htm',
    ],
    mythTitle: 'Climate has changed before',
    mythVideos: ['https://youtu.be/H5kejSYPD7U'],
  },
];

const titles = dummyData.climateEffects.map((effect) => effect.effectTitle);
const queryClient = new QueryClient();

describe('Feed Renders', () => {
  const sandbox = sinon.createSandbox();
  sandbox.stub(reactQuery, 'useQuery').returns({
    data: dummyData,
    status: 'sucess',
    isLoading: false,
    error: null,
  });
  const sandboxMyths = sinon.createSandbox();
  sandboxMyths.stub(reactQuery, 'useQueries').returns({
    data: dummyMyths,
    status: 'sucess',
    isLoading: false,
    error: null,
  });

  it('Should have the correct numbber of cards', async () => {
    const { getAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ClimateFeed />
      </QueryClientProvider>
    );
    const cards = getAllByTestId('CMCard');
    expect(cards.length).toBe(5);
  });

  it('Should contain all the titles', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ClimateFeed />
      </QueryClientProvider>
    );
    titles.forEach((title) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });
});
