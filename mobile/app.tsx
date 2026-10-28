import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { Zone, ZoneStatus } from './src/types';
import { createZone, deleteZone, getZone, getZones, replaceZone, updateZone } from './src/api';

const statuses: ZoneStatus[] = ['OPEN', 'FULL', 'CLOSED'];

export default function App() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const selected = zones.find(zone => zone.id === selectedId);

  async function loadZones() {
    setLoading(true);
    setError('');
    try {
      const value = await getZones();
      setZones(value);
      if (!selectedId && value.length > 0) setSelectedId(value[0].id);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Error de red');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadZones();
  }, []);

  async function run(label: string, task: () => Promise<unknown>) {
    setBusy(true);
    setError('');
    setResult('');
    try {
      const response = await task();
      setResult(label + '\n' + JSON.stringify(response, null, 2));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Error de red');
    } finally {
      setBusy(false);
    }
  }

  function selectZone(zone: Zone) {
    setSelectedId(zone.id);
    setName(zone.name);
    setCapacity(String(zone.capacity));
    setError('');
    setResult('');
  }

  function addZone() {
    const parsedCapacity = Number(capacity);
    if (!name.trim() || !Number.isInteger(parsedCapacity) || parsedCapacity <= 0) {
      setError('Escribe un nombre y una capacidad entera mayor que cero.');
      return;
    }
    void run('POST crear zona', () => createZone({
      name: name.trim(),
      capacity: parsedCapacity,
      status: 'OPEN'
    }));
  }

  function saveZone() {
    if (!selected) return;
    const parsedCapacity = Number(capacity);
    if (!name.trim() || !Number.isInteger(parsedCapacity) || parsedCapacity <= 0) {
      setError('Escribe un nombre y una capacidad entera mayor que cero.');
      return;
    }
    void run('PUT editar zona', () => replaceZone(selected.id, {
      name: name.trim(),
      capacity: parsedCapacity,
      status: selected.status
    }));
  }

  function changeStatus() {
    if (!selected) return;
    const nextStatus = statuses[(statuses.indexOf(selected.status) + 1) % statuses.length];
    void run('PATCH cambiar estado', () => updateZone(selected.id, nextStatus));
  }

  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>FESTIVAL OPERATIONS</Text>
        <Text style={styles.title}>Venue Control</Text>
        <Text style={styles.subtitle}>Espacios del recinto</Text>

        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Zonas</Text>
          <Pressable disabled={loading || busy} style={styles.secondaryButton} onPress={() => void loadZones()}>
            <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Recargar'}</Text>
          </Pressable>
        </View>

        {zones.map(zone => (
          <Pressable key={zone.id} style={[styles.card, selectedId === zone.id && styles.selectedCard]} onPress={() => selectZone(zone)}>
            <View style={styles.zoneHeading}>
              <Text style={styles.zoneName}>{zone.name}</Text>
              <Text style={[styles.status, zone.status === 'OPEN' ? styles.open : zone.status === 'FULL' ? styles.full : styles.closed]}>
                {zone.status}
              </Text>
            </View>
            <Text style={styles.capacity}>{zone.capacity.toLocaleString()} personas</Text>
            <Text style={styles.zoneId}>{zone.id}</Text>
          </Pressable>
        ))}

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Nuevo espacio</Text>
          <TextInput
            accessibilityLabel="Nombre de la zona"
            placeholder="Nombre"
            placeholderTextColor="#898a98"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            accessibilityLabel="Capacidad de la zona"
            placeholder="Capacidad"
            placeholderTextColor="#898a98"
            keyboardType="number-pad"
            value={capacity}
            onChangeText={setCapacity}
            style={styles.input}
          />
          <Pressable disabled={busy || loading} style={styles.button} onPress={addZone}>
            <Text style={styles.buttonText}>Crear zona</Text>
          </Pressable>
        </View>

        {selected ? (
          <View style={styles.panel}>
            <Text style={styles.sectionTitle}>Zona seleccionada</Text>
            <Text style={styles.text}>{selected.id} · {selected.status}</Text>
            <Pressable disabled={busy || loading} style={styles.secondaryButton} onPress={() => void run('GET detalle', () => getZone(selected.id))}>
              <Text style={styles.buttonText}>Ver detalle</Text>
            </Pressable>
            <Pressable disabled={busy || loading} style={styles.button} onPress={saveZone}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </Pressable>
            <Pressable disabled={busy || loading} style={styles.secondaryButton} onPress={changeStatus}>
              <Text style={styles.buttonText}>Cambiar estado</Text>
            </Pressable>
            <Pressable disabled={busy || loading} style={styles.deleteButton} onPress={() => void run('DELETE eliminar zona', () => deleteZone(selected.id))}>
              <Text style={styles.buttonText}>Eliminar zona</Text>
            </Pressable>
          </View>
        ) : null}

        <Text style={styles.note}>Las escrituras son simuladas: se muestra la respuesta de la API, pero la lista no guarda los cambios.</Text>
        {busy ? <Text style={styles.text}>Enviando...</Text> : null}
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        {result ? <Text accessibilityLiveRegion="polite" style={styles.result}>{result}</Text> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#08090d' },
  content: { padding: 24, paddingTop: 48, gap: 16, width: '100%', maxWidth: 760, alignSelf: 'center' },
  eyebrow: { color: '#ff4b9b', fontWeight: '700', letterSpacing: 2 },
  title: { color: '#ffffff', fontSize: 36, fontWeight: '800' },
  subtitle: { color: '#d2d3df', fontSize: 17 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { color: '#ffffff', fontSize: 22, fontWeight: '700' },
  card: { padding: 18, gap: 8, borderRadius: 16, borderWidth: 1, borderColor: '#353644', backgroundColor: '#151620' },
  selectedCard: { borderColor: '#ff4b9b' },
  zoneHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  zoneName: { color: '#ffffff', fontSize: 20, fontWeight: '700' },
  status: { fontWeight: '700', fontSize: 12 },
  open: { color: '#81e6b1' },
  full: { color: '#ffd166' },
  closed: { color: '#ff8b8b' },
  capacity: { color: '#d2d3df', fontSize: 16 },
  zoneId: { color: '#898a98', fontSize: 13 },
  panel: { padding: 18, gap: 12, borderRadius: 16, borderWidth: 1, borderColor: '#353644', backgroundColor: '#11121a' },
  input: { padding: 13, borderRadius: 10, borderWidth: 1, borderColor: '#454654', color: '#ffffff', backgroundColor: '#08090d' },
  button: { padding: 14, backgroundColor: '#cf236e', borderRadius: 10, alignItems: 'center' },
  secondaryButton: { padding: 12, backgroundColor: '#343541', borderRadius: 10, alignItems: 'center' },
  deleteButton: { padding: 12, backgroundColor: '#7d2838', borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  text: { color: '#d2d3df', fontSize: 15, lineHeight: 22 },
  note: { color: '#d2d3df', fontSize: 14, lineHeight: 21 },
  error: { color: '#ffb4b4', fontSize: 15 },
  result: { color: '#afffcf', fontFamily: 'monospace', fontSize: 13, lineHeight: 19 }
});
