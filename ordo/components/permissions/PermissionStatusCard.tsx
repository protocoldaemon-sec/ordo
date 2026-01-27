/**
 * Permission Status Card Component
 * 
 * Displays the status of a granted permission with timestamp.
 */

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@/components/app-text';
import { Permission, Surface } from '@/services/PermissionManager';

interface PermissionStatusCardProps {
  permission: Permission;
  surface: Surface;
  grantedAt: string;
  onRevoke: () => void;
}

const PERMISSION_LABELS: Record<Permission, string> = {
  [Permission.READ_GMAIL]: 'Gmail Access',
  [Permission.READ_SOCIAL_X]: 'X/Twitter Access',
  [Permission.READ_SOCIAL_TELEGRAM]: 'Telegram Access',
  [Permission.READ_WALLET]: 'Wallet Read Access',
  [Permission.SIGN_TRANSACTIONS]: 'Transaction Signing',
};

const SURFACE_COLORS: Record<Surface, string> = {
  [Surface.GMAIL]: '#EA4335',
  [Surface.X]: '#1DA1F2',
  [Surface.TELEGRAM]: '#0088CC',
  [Surface.WALLET]: '#14F195',
};

export function PermissionStatusCard({
  permission,
  surface,
  grantedAt,
  onRevoke,
}: PermissionStatusCardProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.surfaceBadge, { backgroundColor: SURFACE_COLORS[surface] }]}>
          <AppText style={styles.surfaceBadgeText}>{surface}</AppText>
        </View>
        <TouchableOpacity onPress={onRevoke} style={styles.revokeButton}>
          <AppText style={styles.revokeButtonText}>Revoke</AppText>
        </TouchableOpacity>
      </View>

      <AppText style={styles.permissionLabel}>{PERMISSION_LABELS[permission]}</AppText>
      
      <View style={styles.footer}>
        <AppText style={styles.grantedText}>
          Granted {formatDate(grantedAt)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  surfaceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  surfaceBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  revokeButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  revokeButtonText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '600',
  },
  permissionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footer: {
    marginTop: 8,
  },
  grantedText: {
    fontSize: 12,
    opacity: 0.6,
  },
});
