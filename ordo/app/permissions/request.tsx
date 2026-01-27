/**
 * Permission Request Screen
 * 
 * Allows users to grant or revoke permissions for different surfaces.
 */

import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { AppText } from '@/components/app-text';
import { AppView } from '@/components/app-view';
import { Permission, Surface, permissionManager } from '@/services/PermissionManager';

interface PermissionInfo {
  permission: Permission;
  surface: Surface;
  title: string;
  description: string;
  benefits: string[];
  risks: string[];
}

const PERMISSION_INFO: PermissionInfo[] = [
  {
    permission: Permission.READ_GMAIL,
    surface: Surface.GMAIL,
    title: 'Gmail Access',
    description: 'Allow Ordo to search and read your Gmail messages',
    benefits: [
      'Search emails with natural language',
      'Get summaries of important messages',
      'Find information across your inbox',
    ],
    risks: [
      'Ordo will have read access to your emails',
      'Sensitive emails (OTP codes, passwords) are automatically filtered',
    ],
  },
  {
    permission: Permission.READ_SOCIAL_X,
    surface: Surface.X,
    title: 'X/Twitter Access',
    description: 'Allow Ordo to read your X/Twitter DMs and mentions',
    benefits: [
      'Check recent mentions and DMs',
      'Search your message history',
      'Get notifications about important messages',
    ],
    risks: [
      'Ordo will have read access to your DMs',
      'Sensitive messages are automatically filtered',
    ],
  },
  {
    permission: Permission.READ_SOCIAL_TELEGRAM,
    surface: Surface.TELEGRAM,
    title: 'Telegram Access',
    description: 'Allow Ordo to read your Telegram messages',
    benefits: [
      'Search your Telegram chats',
      'Get message summaries',
      'Find information across conversations',
    ],
    risks: [
      'Ordo will have read access to your messages',
      'Sensitive messages are automatically filtered',
    ],
  },
  {
    permission: Permission.READ_WALLET,
    surface: Surface.WALLET,
    title: 'Wallet Read Access',
    description: 'Allow Ordo to view your Solana wallet balance and transactions',
    benefits: [
      'Check your SOL and token balances',
      'View transaction history',
      'Get portfolio summaries',
    ],
    risks: [
      'Ordo will see your wallet address and balances',
      'Your private keys remain secure in Seed Vault',
    ],
  },
  {
    permission: Permission.SIGN_TRANSACTIONS,
    surface: Surface.WALLET,
    title: 'Transaction Signing',
    description: 'Allow Ordo to request transaction signatures',
    benefits: [
      'Send SOL and tokens with natural language',
      'Execute DeFi operations',
      'Manage NFTs',
    ],
    risks: [
      'Ordo can request transaction signatures',
      'You must approve each transaction with biometric auth',
      'Your private keys remain secure in Seed Vault',
    ],
  },
];

export default function PermissionRequestScreen() {
  const router = useRouter();
  const [grantedPermissions, setGrantedPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      const permissions = await permissionManager.getGrantedPermissions();
      setGrantedPermissions(permissions);
    } catch (error) {
      console.error('Failed to load permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrantPermission = async (permissionInfo: PermissionInfo) => {
    try {
      // Show confirmation dialog
      Alert.alert(
        `Grant ${permissionInfo.title}?`,
        permissionInfo.description,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Grant',
            onPress: async () => {
              // TODO: Initiate OAuth flow for the surface
              // For now, just grant the permission without a token
              const result = await permissionManager.requestPermission(
                permissionInfo.permission
              );
              
              if (result.granted) {
                Alert.alert('Success', `${permissionInfo.title} granted`);
                await loadPermissions();
              } else {
                Alert.alert('Error', result.error || 'Failed to grant permission');
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to grant permission');
      console.error('Failed to grant permission:', error);
    }
  };

  const handleRevokePermission = async (permissionInfo: PermissionInfo) => {
    try {
      Alert.alert(
        `Revoke ${permissionInfo.title}?`,
        'This will remove Ordo\'s access to this surface and delete cached data.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Revoke',
            style: 'destructive',
            onPress: async () => {
              await permissionManager.revokePermission(permissionInfo.permission);
              Alert.alert('Success', `${permissionInfo.title} revoked`);
              await loadPermissions();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to revoke permission');
      console.error('Failed to revoke permission:', error);
    }
  };

  const isGranted = (permission: Permission) => {
    return grantedPermissions.includes(permission);
  };

  if (loading) {
    return (
      <AppView style={styles.container}>
        <AppText>Loading permissions...</AppText>
      </AppView>
    );
  }

  return (
    <AppView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Permissions',
          headerBackTitle: 'Back',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <AppText style={styles.title}>Manage Permissions</AppText>
          <AppText style={styles.subtitle}>
            Control what data Ordo can access. All sensitive data is automatically filtered.
          </AppText>
        </View>

        {PERMISSION_INFO.map((permissionInfo) => (
          <View key={permissionInfo.permission} style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <AppText style={styles.permissionTitle}>{permissionInfo.title}</AppText>
              <View
                style={[
                  styles.statusBadge,
                  isGranted(permissionInfo.permission) && styles.statusBadgeGranted,
                ]}
              >
                <AppText
                  style={[
                    styles.statusText,
                    isGranted(permissionInfo.permission) && styles.statusTextGranted,
                  ]}
                >
                  {isGranted(permissionInfo.permission) ? 'Granted' : 'Not Granted'}
                </AppText>
              </View>
            </View>

            <AppText style={styles.permissionDescription}>
              {permissionInfo.description}
            </AppText>

            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>Benefits:</AppText>
              {permissionInfo.benefits.map((benefit, index) => (
                <AppText key={index} style={styles.listItem}>
                  • {benefit}
                </AppText>
              ))}
            </View>

            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>Privacy:</AppText>
              {permissionInfo.risks.map((risk, index) => (
                <AppText key={index} style={styles.listItem}>
                  • {risk}
                </AppText>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              {isGranted(permissionInfo.permission) ? (
                <View
                  style={[styles.button, styles.revokeButton]}
                  onTouchEnd={() => handleRevokePermission(permissionInfo)}
                >
                  <AppText style={styles.revokeButtonText}>Revoke Access</AppText>
                </View>
              ) : (
                <View
                  style={[styles.button, styles.grantButton]}
                  onTouchEnd={() => handleGrantPermission(permissionInfo)}
                >
                  <AppText style={styles.grantButtonText}>Grant Access</AppText>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  permissionCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  permissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  statusBadgeGranted: {
    backgroundColor: '#4caf50',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  statusTextGranted: {
    color: '#fff',
  },
  permissionDescription: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  listItem: {
    fontSize: 13,
    marginLeft: 8,
    marginBottom: 2,
    opacity: 0.7,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  grantButton: {
    backgroundColor: '#2196f3',
  },
  grantButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  revokeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f44336',
  },
  revokeButtonText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '600',
  },
});
