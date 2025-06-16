import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import { binService } from '../../services/binService';
import { Bin as ApiBin } from '../../types/api';
import { Bin } from '../../types';
import { BinCard } from './BinCard';

const mapApiBinToInternalBin = (apiBin: ApiBin): Bin => {
  return {
    id: apiBin._id,
    volume: apiBin.volume,
    productId: apiBin.productId,
    location: apiBin.location,
    availableVolume: apiBin.availableVolume,
    ownerId: apiBin.owner,
    allocations: apiBin.agencies.map(agency => ({
      id: agency.agency._id,
      binId: apiBin._id,
      agencyId: agency.agency._id,
      allocatedUnits: agency.allocatedUnits,
      physicalUnits: agency.physicalUnits,
      invoicedUnits: 0,
      deliveredUnits: 0,
      returnedUnits: 0,
      utilizationRate: (agency.physicalUnits / apiBin.volume) * 100
    }))
  };
};

const BinList: React.FC = () => {
  const [bins, setBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'capacity' | 'agency' | 'inventory'>('capacity');
  const [formData, setFormData] = useState({
    volume: 0,
    agencyId: '',
    allocation: 0,
    currentLevel: 0
  });

  useEffect(() => {
    fetchBins();
  }, []);

  const fetchBins = async () => {
    try {
      const data = await binService.getBins();
      setBins(data.map(mapApiBinToInternalBin));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching bins');
    } finally {
      setLoading(false);
    }
  };

  const handleEditBin = (bin: Bin) => {
    setSelectedBin(bin);
    setDialogType('capacity');
    setFormData({
      volume: bin.volume,
      agencyId: '',
      allocation: 0,
      currentLevel: 0
    });
    setOpenDialog(true);
  };

  const handleDeleteBin = async (binId: string) => {
    try {
      await binService.deleteBin(binId);
      await fetchBins();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting bin');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBin(null);
  };

  const handleSubmit = async () => {
    if (!selectedBin) return;

    try {
      switch (dialogType) {
        case 'capacity':
          await binService.updateBinCapacity(selectedBin.id, formData.volume);
          break;
        case 'agency':
          await binService.updateAgencyAllocation(
            selectedBin.id,
            formData.agencyId,
            formData.allocation
          );
          break;
        case 'inventory':
          await binService.updateInventory(
            selectedBin.id,
            'add',
            formData.currentLevel,
            formData.agencyId
          );
          break;
      }
      await fetchBins();
      handleCloseDialog();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating bin');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        {bins.map((bin) => (
          <Grid item xs={12} sm={6} md={4} key={bin.id}>
            <BinCard 
              bin={bin}
              onEdit={handleEditBin}
              onDelete={handleDeleteBin}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogType === 'capacity' && 'Update Bin Capacity'}
          {dialogType === 'agency' && 'Update Agency Allocation'}
          {dialogType === 'inventory' && 'Update Inventory Level'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'capacity' && (
            <TextField
              autoFocus
              margin="dense"
              label="Volume"
              type="number"
              fullWidth
              value={formData.volume}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, volume: Number(e.target.value) })}
            />
          )}
          {dialogType === 'agency' && (
            <>
              <TextField
                margin="dense"
                label="Agency ID"
                fullWidth
                value={formData.agencyId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, agencyId: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Allocation"
                type="number"
                fullWidth
                value={formData.allocation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, allocation: Number(e.target.value) })}
              />
            </>
          )}
          {dialogType === 'inventory' && (
            <TextField
              autoFocus
              margin="dense"
              label="Current Level"
              type="number"
              fullWidth
              value={formData.currentLevel}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, currentLevel: Number(e.target.value) })}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BinList; 