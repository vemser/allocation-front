import { Box, Typography, TextField, FormControl, FormLabel, Select, MenuItem, Button } from "@mui/material";
import { useForm } from 'react-hook-form'
import AlunoTable from "../AlunoTable";
import { Link } from 'react-router-dom';

export const DashAluno = () => {
  const {register, handleSubmit, reset, formState:{ errors }} = useForm();

  return (
    <Box sx={{
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
          <Typography fontSize='20px' color='primary'>Filtro</Typography>
        </Box>
        <form>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
          }}>
            <TextField type="text" placeholder='Digite o seu nome' id='nome' {...register('nome')} variant="outlined"                
              // error={Boolean(errors?.email && errors.email)}
              // label={errors.email?.message ?? "Nome"} 
              label='Nome'             
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}               
              />
            <TextField type="email" placeholder='Digite o seu nome' id='email' {...register('email')} variant="outlined"                  
              // error={Boolean(errors?.email && errors.email)}
              // label={errors.email?.message ?? "Nome"} 
              label='E-mail' 
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
            justifyContent: 'space-between',
            alignItems: 'center',
            m:"30px 0 100px 0",

            "& .MuiSelect-select": {
              height: '10px',
              width: '200px'
            }
          }}>
            <FormControl >
                <FormLabel htmlFor="tipo-usuario"> Tipo de usuário *</FormLabel>
                <Select id="tipoVaga" defaultValue={"Frontend"}  size="small" {...register("tipoVaga")} >
                  <MenuItem value="Frontend" sx={{ height:'30px' }}>Frontend</MenuItem>
                  <MenuItem value="Backend" sx={{ height:'30px' }}>Backend</MenuItem>
                  <MenuItem value="QA" sx={{ height:'30px' }}>QA</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" sx={{
              height: '50px'
            }}>
              Filtrar
            </Button>
            <Link to='/cadastro-alunos'><Button variant="contained"
            sx={{
              height: '50px'
            }}>
              Cadastra usuário
            </Button></Link>
          </Box>
        </form>
        <AlunoTable />
    </Box>
  )
}