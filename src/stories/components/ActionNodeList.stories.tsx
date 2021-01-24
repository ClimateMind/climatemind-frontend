import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS } from '../../common/styles/CMTheme';
import ActionNodeList, {
  ActionNodeListProps,
} from '../../components/ActionNodeList';
import { TActionNodeList } from '../../types/Actions';
import Wrapper from '../../components/Wrapper';

// const dummyActionsData: TActionNodeList = [
//   {
//     iri: '1',
//     solutionType: 'mitigation',
//     solutionSpecificMythIRIs: [],
//     solutionTitle: 'Action Title 1',
//     solutionSources: [
//       'https://p0.pikist.com/photos/893/1014/friends-male-men-outside-winter-cold-bench-conversation-smile.jpg',
//     ],
//     shortDescription:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, dolor sit amet, consectetur adipiscing…',
//     longDescription:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, dolor sit amet, consectetur adipiscing…',
//     imageUrl:
//       'https://p0.pikist.com/photos/893/1014/friends-male-men-outside-winter-cold-bench-conversation-smile.jpg',
//   },
//   {
//     iri: '2',
//     solutionType: 'adaptation',
//     solutionSpecificMythIRIs: [],
//     solutionTitle: 'Action Title 2',
//     solutionSources: [
//       'https://p0.pikist.com/photos/893/1014/friends-male-men-outside-winter-cold-bench-conversation-smile.jpg',
//     ],
//     shortDescription:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, dolor sit amet, consectetur adipiscing…',
//     longDescription:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, dolor sit amet, consectetur adipiscing…',
//     imageUrl:
//       'https://p0.pikist.com/photos/893/1014/friends-male-men-outside-winter-cold-bench-conversation-smile.jpg',
//   },
// ];

export default {
  title: 'ClimateMind/components/ActionNodeList',
  component: ActionNodeList,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY}>
        <Story />
      </Wrapper>
    ),
  ],
} as Meta;

const Template: Story<ActionNodeListProps> = (args) => (
  <ActionNodeList {...args} />
);

// export const DefaultCard = Template.bind({});
// DefaultCard.args = {
//   nodes: dummyActionsData,
// };

// export const WithHeader = Template.bind({});
// WithHeader.args = {
//   header: (
//     <CardHeader
//       title="Card Title"
//       preTitle="PRE-TITLE"
//       index={2}
//       cardIcon="idea"
//     />
//   ),
//   index: 2,
// };
