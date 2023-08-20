import {Settings} from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getSettings = async (): Promise<Settings> => {
    const instanceUrl = await AsyncStorage.getItem('instanceUrl');
    const token = await AsyncStorage.getItem('token');
		const disableClipboard = await AsyncStorage.getItem('disableClipboard');
		const initialViewMode = await AsyncStorage.getItem('initialViewMode');
		const browserMode = await AsyncStorage.getItem('browserMode');

    return {
        instanceUrl,
        token,
        disableClipboard: disableClipboard?.length,
        initialViewMode: initialViewMode || 'unread',
        browserMode: browserMode || 'in-app'
    } as Settings;
};

const saveSettings = async (settings?: Settings): Promise<void> => {
    if (!settings)
        return;

    await AsyncStorage.setItem('instanceUrl',settings.instanceUrl || '');
    await AsyncStorage.setItem('token',settings.token || '');
    await AsyncStorage.setItem('disableClipboard',settings.disableClipboard ? 'true' : '');
    await AsyncStorage.setItem('initialViewMode',settings.initialViewMode?.toString() || '');
    await AsyncStorage.setItem('browserMode',settings.browserMode?.toString() || '');
};

export {
    getSettings,
    saveSettings
};
