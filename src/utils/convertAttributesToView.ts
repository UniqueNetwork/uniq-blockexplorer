import isEmpty from 'lodash/isEmpty';
import { AttributeType, DecodedAttributes, EncodedTokenAttributeValue, LocalizedStringWithDefault, LocalizedStringOrBoxedNumberWithDefault } from '@unique-nft/api';

export type AttributeValue = {
  name: LocalizedStringWithDefault;
  value: LocalizedStringOrBoxedNumberWithDefault | Array<LocalizedStringOrBoxedNumberWithDefault>;
  type: AttributeType;
  isArray: boolean;
  rawValue: EncodedTokenAttributeValue;
  isEnum: boolean;
}

export interface AttributeView {
  name: string;
  value: string | string[];
}

const getValueOrDefaultValue = (obj: LocalizedStringOrBoxedNumberWithDefault, lang = 'en'): string => {
  return (obj as LocalizedStringWithDefault)[lang] ?? obj._.toString();
};

export const convertAttributesToView = (attributes: DecodedAttributes): AttributeView[] => {
  if (!attributes || isEmpty(attributes)) {
    return [];
  }

  return Object.values(attributes).map((value: AttributeValue) => {
    if (value.isArray) {
      return {
        name: getValueOrDefaultValue(value.name),
        value: (value.value as LocalizedStringOrBoxedNumberWithDefault[]).map((val: LocalizedStringOrBoxedNumberWithDefault) => getValueOrDefaultValue(val)),
      };
    }

    return {
      name: getValueOrDefaultValue(value.name),
      value: getValueOrDefaultValue(value.value as LocalizedStringOrBoxedNumberWithDefault),
    };
  });
};