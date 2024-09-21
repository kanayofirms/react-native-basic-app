import { View, Text, FlatList } from "react-native";
import React from "react";

// const Trending = ({ posts }) => {
//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={(item) => item.$id}
//       renderItem={({ item }) => (
//         <Text className="text-3xl text-white">{item.id}</Text>
//       )}
//       horizontal
//     />
//   );
// };

const Trending = ({ posts }) => {
  console.log("Posts:", posts);
  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => item?.$id ?? index.toString() ?? ""} // Convert $id to string && add null check
      renderItem={({ item, index }) => (
        <Text className="text-3xl text-white">{item.$id ?? index}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;
