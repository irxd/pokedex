import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { POKEMON_IMAGE_URL } from '../../utils/constant';

function List(props) {
  const { list, handleDetail, getPokemonId } = props;

  return (
    <Grid container justify="center" spacing={2}>
      <Grid container xs={8} spacing={2}>
        {
          list.map(pokemon => (
            <Grid item xs={3}>
              <Card onClick={() => {handleDetail(pokemon.name)}}>
                <CardActionArea>
                  <CardContent>
                    <img src={`${POKEMON_IMAGE_URL}/${pokemon.id || getPokemonId(pokemon.url)}.png`} alt={pokemon.name} height="128" width="128" />
                    <Typography gutterBottom variant="h5" component="h2">
                      {pokemon.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      #{pokemon.id || getPokemonId(pokemon.url)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  );
}

export default List;
