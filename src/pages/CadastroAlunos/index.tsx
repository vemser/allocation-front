import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { Grid, Box, TextField, FormControl, FormLabel, Select, MenuItem, Button, Typography, RadioGroup, FormControlLabel, Radio, TextareaAutosize } from "@mui/material";
import { useForm } from 'react-hook-form'

export const CadastroAlunos = () => {

    const {register, handleSubmit} = useForm();

  return (
    <Grid 
    sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5%',
      }}>
        <HeaderPrincipal />
        <Box 
        sx={{
        width: '80%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        p: '15px 40px',
        borderRadius:  '15px',
        boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
        margin: '30px'
        }}>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        >
            <Typography fontSize='25px' color='primary'>Cadastro de Aluno</Typography>
        </Box>
        <Box component='form' id='form' 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
          }}>
            <TextField type="text" placeholder='Digite o seu nome' id='nome' {...register('nome')} variant="outlined"                
              // error={Boolean(errors?.email && errors.email)}
              // label={errors.email?.message ?? "Nome"} 
              label='Nome Completo'             
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}               
              />
            <TextField type="tel" placeholder='Digite o seu telefone' id='email' {...register('email')} variant="outlined"                  
              // error={Boolean(errors?.email && errors.email)}
              // label={errors.email?.message ?? "Nome"} 
              label='Telefone' 
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}                  
              />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
          }}>
            <TextField type="text" placeholder='Digite o seu cidade' id='cidade' {...register('cidade')} variant="outlined"                
              // error={Boolean(errors?.email && errors.email)}
              // label={errors.email?.message ?? "Nome"} 
              label='Cidade'             
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}               
              />
            <TextField type="text" placeholder='Digite o seu nome' id='email' {...register('email')} variant="outlined"                  
              // error={Boolean(errors?.email && errors.email)}
              // label={errors.email?.message ?? "Nome"} 
              label='Estado' 
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}                  
              />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            alignItems: 'center'
          }}>
            <TextField type="email" placeholder='Digite o seu e-mail' id='email' {...register('email')} variant="outlined"                
              // error={Boolean(errors?.email && errors.email)}
              // label={errors.email?.message ?? "Nome"} 
              label='Email'             
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}               
              />
            {/* <TextField type="text" placeholder='Digite o seu nome' id='email' {...register('email')} variant="outlined"                  
              // error={Boolean(errors?.email && errors.email)}
              // label={errors.email?.message ?? "Nome"} 
              label='E-mail' 
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}                  
              /> */}

            <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            id="radio"
            sx={{
                width: '100%',
            }}
                >
                <Box
                sx={{
                    border: '1px solid #ababab',
                    borderRadius: '15px',
                    p: '5px'
                }}
                >                    
                    <FormControlLabel value="frontend" control={<Radio />} label="Frontend" />
                    <FormControlLabel value="backend" control={<Radio />} label="Backend" />
                    <FormControlLabel value="qa" control={<Radio />} label="QA" />
                </Box>
            </RadioGroup>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb:"100px",

            "& .MuiSelect-select": {
              height: '10px',
              width: '200px'
            }
          }}>
            <FormControl >
                <FormLabel htmlFor="tipo-usuario"> Tipo de usuário *</FormLabel>
                <Select id="tipoVaga" defaultValue={"10edicao"}  size="small" {...register("tipoVAaga")} >
                  <MenuItem value="11edicao" sx={{ height:'30px' }}>11ª Edição</MenuItem>
                  <MenuItem value="10edicao" sx={{ height:'30px' }}>10ª Edição</MenuItem>
                  <MenuItem value="9edicao" sx={{ height:'30px' }}>9ª Edição</MenuItem>
                </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <Box sx={{ width: '100%'}}>
                <TextField
                    label= 'Descrição'
                    placeholder="Descrição"
                    multiline
                    rows={2}
                    maxRows={4}
                    />
            </Box>
            <Box sx={{ width: '100%'}}>                
                <Button variant="contained" sx={{
                height: '50px'
                }}>
                Salvar
                </Button>
            </Box>
          </Box>
        </Box>
        </Box>
    </Grid>
  )
}