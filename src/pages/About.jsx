import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

// Warna biru yang lebih cerah
const brightBlueColor = '#8DCBF4';
// Warna latar belakang keseluruhan
const overallBackgroundColor = '#2793D8';

const biodataList = [
  {
    name: 'TEGAR TRY B.D',
    nim: '1203210022',
    kelas: 'IF-01-01',
    prodi: 'INFORMATIKA',
    angkatan: '2021',
    avatarUrl: 'https://raw.githubusercontent.com/aisyadwi/foto/main/tejo.jpg',
  },
  {
    name: 'EMILIA R',
    nim: '1203210017',
    kelas: 'IF-01-01',
    prodi: 'INFORMATIKA',
    angkatan: '2021',
    avatarUrl: 'https://github.com/aisyadwi/foto/blob/main/mama.jpg?raw=true',
  },
  {
    name: 'ADE DIAN S',
    nim: '1203210010',
    kelas: 'IF-01-01',
    prodi: 'INFORMATIKA',
    angkatan: '2021',
    avatarUrl: 'https://raw.githubusercontent.com/aisyadwi/foto/main/ade.jpg',
  },
  {
    name: 'PANCA A.M',
    nim: '1203210066',
    kelas: 'IF-01-01',
    prodi: 'INFORMATIKA',
    angkatan: '2021',
    avatarUrl: 'https://raw.githubusercontent.com/aisyadwi/foto/main/panca.jpg',
  },
  {
    name: 'AISYA DWI A',
    nim: '1203210061',
    kelas: 'IF-01-01',
    prodi: 'INFORMATIKA',
    angkatan: '2021',
    avatarUrl: 'https://raw.githubusercontent.com/aisyadwi/foto/main/fotoku.jpg',
  },
];

class About extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: overallBackgroundColor }]}>
        {biodataList.map((biodata, index) => (
          <View key={index} style={[styles.profileContainer, { backgroundColor: brightBlueColor }]}>
            <Image source={{ uri: biodata.avatarUrl }} style={styles.avatar} />
            <Text style={styles.name}>{biodata.name}</Text>
            <View style={styles.detailsContainer}>
              <DetailItem label="NIM           " value={biodata.nim} />
              <DetailItem label="KELAS       " value={biodata.kelas} />
              <DetailItem label="PRODI        " value={biodata.prodi} />

            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

class DetailItem extends Component {
  render() {
    const { label, value } = this.props;
    return (
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.details}>{value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailsContainer: {
    alignItems: 'flex-start',
    marginTop: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 18,
    color: '#555',
    marginRight: 10,
    fontWeight: 'bold',
    width: 100, 
  },
  details: {
    fontSize: 18,
    color: '#555',
  },
});

export default About;