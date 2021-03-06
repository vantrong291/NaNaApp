import React, {Component} from "react";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    List,
    ListItem,
    Text,
    Thumbnail,
    Left,
    Right,
    Body
} from "native-base";
import axios from "axios";
import {Dimensions, FlatList, Image, ScrollView} from "react-native";
import View from "../../theme/components/View";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import TrackPlayer from "../trackPlayer";
import styles from "./styles";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Spinner from "react-native-spinkit";


const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";

const page = 1;
const numOfSong = 20;

const recommendSongUrl = `http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getListSongHot?page=${page}&num=${numOfSong}`;

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;


class RecommendSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            loading: true,
            albumInfo: []
        };
    }


    _isMounted = false;

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        axios.get(recommendSongUrl)
            .then((res) => {
                this._isMounted && this.setState({lists: res.data.data});
                this._isMounted && this.setState({albumInfo: res.data.data});
                this._isMounted && this.setState({loading: false});
            });
    };

    onItemPress = (item) => async () => {
        await TrackPlayer.reset();
        await TrackPlayer.add({
            id: item.id,
            url: item.download_url,
            title: item.name,
            artist: item.singer,
            artwork: item.image310,
            album: item.album ? item.album : "Chưa xác định",
            genre: item.genre ? item.genre : "Chưa xác định",
            // description: item.lyric
            // duration: song.duration,
        });
        await TrackPlayer.play();
    };

    onAddNowPlayingPress = (item) => async () => {
        await TrackPlayer.add({
            id: item.id,
            url: item.download_url,
            title: item.name,
            artist: item.singer,
            artwork: item.image310,
            album: item.album ? item.album : "Chưa xác định",
            genre: item.genre ? item.genre : "Chưa xác định",
            // description: item.lyric
            // duration: song.duration,
        });
        // await TrackPlayer.play();
    };

    renderItem = ({item}) => (
        <ListItem style={{marginLeft: 13}} thumbnail key={item.id}>
            <Left>
                <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
                    <Thumbnail square source={{uri: item.image}} style={{borderRadius: 6}}/>
                </TouchableScale>
            </Left>
            <Body>
            <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
                <Text numberOfLines={1}>
                    {item.name}
                </Text>
                <Text numberOfLines={1} note>
                    {item.singer}
                </Text>
            </TouchableScale>
            </Body>
            <Right style={{flexDirection: "row", alignItems: "center"}}>
                <TouchableScale onPress={this.onAddNowPlayingPress(item)}>
                    <Icon name="playlist-plus" size={28}/>
                </TouchableScale>
            </Right>
        </ListItem>
    );

    render() {
        const datas = this.state.lists;

        return (this.state.loading) ? (
            <Spinner type="WanderingCubes" size={30} color="green" style={{alignSelf: "center", paddingTop: 150}}/>
        ) : (
            <ScrollView style={{paddingBottom: 50}}>
                <FlatList
                    data={datas}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        );
    }
}

export default RecommendSongs;
