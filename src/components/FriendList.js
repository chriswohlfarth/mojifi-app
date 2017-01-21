import * as NavigationState from '../modules/navigation/NavigationState';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';
import _ from 'lodash';
import Emoji from 'react-native-emoji';
const emojiName = require("emoji-name-map");
import Icon from 'react-native-vector-icons/MaterialIcons';
var moment = require('moment');
moment().format('YYYY-MM-DD HH:MM:SS');
import * as snapshot from '../utils/snapshot';
import Share, {ShareSheet, Button} from 'react-native-share';

const timeline = [
  {title: 'Henrik Lindblom', emoji: 'coffee', sender: true, opened: false, updatedAt: '2017-01-21 06:00:00'},
  {title: 'Alexander Brandemyr', emoji: 'heart', sender: true, opened: false, updatedAt: '2017-01-21 05:00:00'},
  {title: 'Kenny Lindblom', emoji: 'fist', sender: false, opened: true, updatedAt: '2017-01-21 03:00:00'},
  {title: 'Petter Romhagen', emoji: 'monkey', sender: false, opened: true, updatedAt: '2017-01-21 03:00:00'},
  {title: 'Erik Wahlström', emoji: 'frog', sender: true, opened: true, updatedAt: '2017-01-21 06:05:00'},
  {title: 'Martin Gustafsson', emoji: 'smile', sender: false, opened: true, updatedAt: '2017-01-21 01:00:00'},
  {title: 'Ben Pasternak', emoji: 'truck', sender: true, opened: true, updatedAt: '2017-01-20 03:00:00'},
  {title: 'Ted Valentin', emoji: 'computer', sender: true, opened: true, updatedAt: '2017-01-19 03:00:00'},
  {title: 'Justin Kan', emoji: 'pig', sender: false, opened: true, updatedAt: '2017-01-19 02:00:00'},
  {title: 'Casey Neistat', emoji: 'apple', sender: false, opened: true, updatedAt: '2017-01-18 03:00:00'},
  {title: 'Felix Kjellberg', emoji: ''}
]

class FriendList extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      timelineDataSource: ds.cloneWithRows(timeline)
    }
  }

  bored(friend) {
    // this.props.dispatch(NavigationState.pushRoute({
    //   key: 'Color',
    //   title: 'hej'
    // }));
    this.props.boredyo({
      friend
    });
  }
    _renderFriendsRow(friend) {
      if(!friend.hasOwnProperty('sender')){
        return (
          <TouchableOpacity style={styles.episodeRow} onPress={(event) => this.bored(friend)}>
            <View style={styles.episodeWrap}>
              <View style={styles.episodeInfo}>
                <View style={styles.topInfo}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon style={styles.icon} name="account-box" size={20} color="#ffffff" />
                  <View>
                    <Text style={styles.title}>{friend.title}</Text>
                    <Text style={styles.timestamp}>No mojifications yet</Text>
                  </View>
                  </View>
                  <Text style={styles.emoji}>{emojiName.get(friend.emoji)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      }
      if (friend.sender == true && friend.opened == true) {
      return (
          <TouchableOpacity style={styles.episodeRow} onPress={(event) => this.bored(friend)}>
            <View style={styles.episodeWrap}>
              <View style={styles.episodeInfo}>
                <View style={styles.topInfo}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon style={styles.icon} name="label-outline" size={20} color="#ffffff" />
                    <View>
                      <Text style={styles.title}>{friend.title}</Text>
                      <Text style={styles.timestamp}>Opened {moment(friend.updatedAt).fromNow()}</Text>
                    </View>
                  </View>
                  <Text style={styles.emoji}>{emojiName.get(friend.emoji)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      }
      if (friend.sender == true) {
        return (
          <TouchableOpacity style={styles.episodeRow} onPress={(event) => this.bored(friend)}>
            <View style={styles.episodeWrap}>
              <View style={styles.episodeInfo}>
                <View style={styles.topInfo}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon style={styles.icon} name="label" size={20} color="#ffffff" />
                    <View>
                      <Text style={styles.title}>{friend.title}</Text>
                      <Text style={styles.timestamp}>Sent {moment(friend.updatedAt).fromNow()}</Text>
                    </View>
                  </View>
                  <Text style={styles.emoji}>{emojiName.get(friend.emoji)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      }
    else {
      return (
        <TouchableOpacity style={styles.episodeRow} onPress={(event) => this.bored(friend)}>
          <View style={styles.episodeWrap}>
            <View style={styles.episodeInfo}>
              <View style={styles.topInfo}>
                <View style={{flexDirection: 'row'}}>
                  <Icon style={styles.icon} name="check-box-outline-blank" size={20} color="#ffffff" />
                  <View>
                      <Text style={styles.title}>{friend.title}</Text>
                      <Text style={styles.timestamp}>Received {moment(friend.updatedAt).fromNow()}</Text>
                  </View>
                </View>
                <Text style={styles.emoji}>{emojiName.get(friend.emoji)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }
  render() {
    // renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
    return (
      <ListView
        style={{marginTop: 60}}
        dataSource={this.state.timelineDataSource} 
        renderRow={(friend) => { return this._renderFriendsRow(friend) }}
        renderFooter={() => 
        <View style={{alignItems: 'center', marginBottom: 20, marginTop: 20}}>
        <Text style={{fontSize: 14, fontFamily: 'Montserrat', color: '#ffffff'}}>An emoji is worth a thousand words.</Text>
        <Text style={{fontSize: 14, fontFamily: 'Montserrat', color: '#ffffff', marginTop: 5, marginBottom: 20,}}>Share them with your friends.</Text>
          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.8}
            onPress={() => {Share.open({
              title: "Mojifi - An emoji is worth a thousand words.",
              message: "An emoji is worth a thousand words. Share them with friends and family to let them know what's happening.",
              url: "http://christopherwohlfarth.com/",
              subject: "Mojifi - An emoji is worth a thousand words." //  for email
            }).catch((err) => { err && console.log(err); })}}
            >
            <Text style={{fontSize: 14, fontFamily: 'Montserrat', color: this.props.color}}>Invite Friends</Text>
          </TouchableOpacity>
        </View>}
      />
    );
  }
}

const styles = StyleSheet.create({
  episodeRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 70,
    // backgroundColor: 'gray'
  },
  icon: {
    marginLeft: 10,
    marginTop: 7,
  },
  sendBtn: {
    width: 200,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  episodeWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },

  episodeInfo: {
    flex: 1,
    flexDirection: "column",
    marginRight: 10,
  },

  topInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  title: {
    fontWeight: '600',
    color: "#ffffff",
    fontFamily: "Montserrat",
    fontSize: 15,
    marginLeft: 10,
  },

  emoji: {
    color: "#ffffff",
    fontFamily: "Futura",
    fontSize: 28,
  },

  timestamp: {
    color: "#ffffff",
    fontSize: 10,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    marginTop: 5,
    marginLeft: 10,
  },

  description: {
    color: "#8c8c8c",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
    lineHeight: 18,
  },

  lastName: {
    marginLeft: 0,
  },

  episodeImage: {
    width: 50,
    height: 50,
    backgroundColor: 'powderblue',
    marginLeft: 10,
    marginRight: 15,
    borderRadius: 25,
  },

  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff',
  },
});

module.exports = FriendList