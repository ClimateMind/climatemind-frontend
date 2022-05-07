import React from 'react';
import AchievementIcon from '../../assets/personal_values/small_icons/achievement_icon.gif';
import BenevolanceIcon from '../../assets/personal_values/small_icons/benevolence_icon.gif';
import ConformityIcon from '../../assets/personal_values/small_icons/conformity_icon.gif';
import HedonismIcon from '../../assets/personal_values/small_icons/hedonism_icon.gif';
import PowerIcon from '../../assets/personal_values/small_icons/power_icon.gif';
import SecuritytIcon from '../../assets/personal_values/small_icons/security_icon.gif';
import SelfDirectionIcon from '../../assets/personal_values/small_icons/self_direction_icon.gif';
import StimulationIcon from '../../assets/personal_values/small_icons/stimulation_icon.gif';
import TraditionIcon from '../../assets/personal_values/small_icons/tradition_icon.gif';
import UniversalismIcon from '../../assets/personal_values/small_icons/universalism_icon.gif';
import { TPersonalValueIds } from '../../types/PersonalValues';

export interface ValueIconProps {
  valueId: TPersonalValueIds;
  valueName: string;
}

export const ValueIcon: React.FC<ValueIconProps> = ({ valueId, valueName }) => {
  const getIcon = () => {
    switch (valueId) {
      case 'achievement':
        return AchievementIcon;
      case 'hedonism':
        return HedonismIcon;
      case 'stimulation':
        return StimulationIcon;
      case 'security':
        return SecuritytIcon;
      case 'conformity':
        return ConformityIcon;
      case 'benevolence':
        return BenevolanceIcon;
      case 'tradition':
        return TraditionIcon;
      case 'universalism':
        return UniversalismIcon;
      case 'self_direction':
        return SelfDirectionIcon;
      case 'power':
        return PowerIcon;
      default:
        return;
    }
  };

  return (
    <>
      <div>
        <img
          src={getIcon()}
          alt={`${valueName} icon`}
          style={{ height: '80px', width: '80px' }}
        />
      </div>
    </>
  );
};
