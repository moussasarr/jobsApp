import React, { Component } from 'react';
import { MapView } from 'expo';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';


class ReviewScreen extends Component {
  static navigationOptions = ({navigation}) => ({
        title: 'Review Jobs',
        headerRight: (
            <Button
                title="Settings"
                onPress={() => navigation.navigate('settings')}
                backgroundColor="rgba(0,0,0,0)"
                color="rgba(0, 122, 255, 1)"
            />
        ),
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon name="favorite" size={30} color={ tintColor } />
          );
        }
    });

 renderLikedJobs() {
   return this.props.likedJobs.map( job => {
     const {
       company, jobtitle, jobkey,
       formattedRelativeTime,
       url, longitude, latitude } = job;

     const initialRegion = {
       latitude,
       longitude,
       latitudeDelta: 0.045,
       longitudeDelta: 0.02
     };
     return (
       <Card title={jobtitle} key={jobkey}>
         <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              scrollEnabled={false}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
         </View>
       </Card>
     );
   })
 }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>

    );
  }
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

const mapStateToProps = (state) => {
  return { likedJobs: state.likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
