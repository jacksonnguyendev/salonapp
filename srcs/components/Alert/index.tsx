import React from 'react';
import {View} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import {responsive} from 'core';
import {theme} from 'theme';

const AlertColors = {
  info: theme.colors.info,
  success: theme.colors.success,
  error: theme.colors.error,
  warning: theme.colors.warning,
};

export type AlertStatus = keyof typeof AlertColors;

type AlertActions = {
  label: string;
  onPress: () => void;
  buttonProps: typeof Button;
}[];
export type AlertProps = {
  status?: AlertStatus;
  title?: string;
  description?: string;
  visible: boolean;
  onDismiss?: () => void;
  actions?: AlertActions;
};

export const Alert = (props: AlertProps) => {
  const {
    status = 'info',
    title = '',
    description = '',
    visible = false,
    onDismiss,
    actions = [],
  } = props;

  const handleDimiss = () => {
    if (onDismiss) onDismiss();
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={handleDimiss}
        style={{overflow: 'hidden'}}>
        <View
          style={{
            height: responsive.getSize.h(5),
            backgroundColor: AlertColors[status],
          }}
        />
        <Dialog.Title accessibilityStates>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{description}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          {actions.map(action => (
            <Button
              accessibilityStates
              onPress={action.onPress}
              {...action.buttonProps}>
              {action.label}
            </Button>
          ))}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
