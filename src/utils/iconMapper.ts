import eldtIcon from '../assets/images/eldt-icon.svg';
import gvsIcon from '../assets/images/gvs-icon.svg';
import hvsIcon from '../assets/images/hvs-icon.svg';
import tplIcon from '../assets/images/tpl-icon.svg';

export const getIconByType = (type: string) => {
  switch (type) {
    case 'TPL':
      return tplIcon;
    case 'ColdWaterAreaMeter':
      return hvsIcon;
    case 'HotWaterAreaMeter':
      return gvsIcon;
    case 'ELDT':
      return eldtIcon;
    default:
      return '';
  }
};

export const getMeterLabelByType = (type: string) => {
  switch (type) {
    case 'TPL':
      return 'TPL';
    case 'ColdWaterAreaMeter':
      return 'ХВС';
    case 'HotWaterAreaMeter':
      return 'ГВС';
    case 'eltd':
      return 'ЭЛТД';
    default:
      return '';
  }
};
