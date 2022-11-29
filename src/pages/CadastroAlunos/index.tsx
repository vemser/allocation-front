import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { Grid, Box, TextField, FormControl, FormLabel, Select, MenuItem, Button, Typography, RadioGroup, FormControlLabel, Radio, TextareaAutosize } from "@mui/material";
import { useForm } from 'react-hook-form'
import { TAluno } from "../../util/types";
import { alunoSchema } from "../../util/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlunoContext } from "../../context/AlunoContext";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import InputMask from "react-input-mask";
import { toastConfig } from "../../util/toast";
import { toast } from "react-toastify";



export const CadastroAlunos = () => {

    const {register, handleSubmit, formState: { errors }, reset} = useForm<TAluno>({
      resolver:yupResolver(alunoSchema)
    });

    const { handleCreateAluno, setRadioValue, radioValue, tecnologias, setTecnologias } = useContext(AlunoContext);

    const [tec, setTec] = useState<string>('');

    const incrementTec = (event: React.ChangeEvent<HTMLInputElement>)=> {
      // event.target.value.length <= 0 ? toast.error('Valor vazio', toastConfig) : setTec(event.target.value);
      setTec(event.target.value)
    } 
    
    const addTec = ()=>{ 
      tecnologias.includes(tec)? toast.error('Tecnologia já existe', toastConfig) : setTecnologias([...tecnologias, tec]);      
      setTec('')
    };

    // useEffect(()=> {
    //   console.log(tecnologias);
    // }, [tecnologias]);


    const deleteTec: any = (el: string)=>{      
      setTecnologias(tecnologias.filter(r => r != el))
    };


    const handleChange = (event: any)=> {
      setRadioValue(event.target.value)
    }

    const handleCreate =(data: TAluno)=>{
      handleCreateAluno(data);      
      reset();
    }

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
        <Box component='form' id='form' onSubmit={handleSubmit(handleCreate)}
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
            <TextField type="text" placeholder='Digite o nome completo' id='nome' {...register('nome')} variant="outlined"                
              error={Boolean(errors?.nome && errors.nome)}
              label={errors.nome?.message ?? "Nome"}                         
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}               
              />
            <TextField type="tel" placeholder='Digite o número de telefone' id='telefone' {...register('telefone')} variant="outlined"                  
              error={Boolean(errors?.telefone && errors.telefone)}
              label={errors.telefone?.message ?? "Telefone"}               
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
              error={Boolean(errors?.cidade && errors.cidade)}
              label={errors.cidade?.message ?? "Cidade"}         
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}               
              />
            <TextField type="text" placeholder='Digite o seu nome' id='estado' {...register('estado')} variant="outlined"                  
              error={Boolean(errors?.estado && errors.estado)}
              label={errors.estado?.message ?? "Estado"}  
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
            width: '100%',
            justifyContent: 'center',
            gap: '40px'
          }}>
            <Box 
            sx={{
              width: '100%',
              displar: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}
            >              
              <TextField type="text" placeholder='Tecnologias' id='tecnologias' variant="outlined"  {...register('tecnologias')}
                label='Tecnologias'        
                sx={{
                  width: '50%',
                  "& .MuiInputBase-input": {
                    height: '10px'
                  }
                }}
                value={tec}              
                onChange={incrementTec}
                />
                <Button variant={"contained"} sx={{width: '20px', height: '40px'}} onClick={addTec}>
                  +
                </Button>
            </Box>
            <Box sx={{
              border: '1px solid #ababab',
              borderRadius: '15px',
              p: '5px',
              display: 'flex',
              width: '100%',
              height: '90px',
              overflowX: 'auto',
              alignItems: 'center',
              gap: '10px'
            }}>
              {tecnologias.map((el)=>(
                <Box key={el}
                sx={{
                  display: 'flex',
                  border: '1px solid #ababab',
                  borderRadius: '15px',
                  p: '10px',
                  height: '50px',
                  gap: '5px'
                }}
                >
                  {el}
                  <Box sx={{ 
                    width: '30px', 
                    borderRadius: '50%', 
                    background: 'red', 
                    display: 'flex', 
                    justigyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                    }} onClick={()=> deleteTec(el)}>
                    <DeleteIcon />
                  </Box>
                </Box>
              ))}
            </Box>

          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            alignItems: 'center'
          }}>
            <TextField type="email" placeholder='Digite o seu e-mail' id='email' {...register('email')} variant="outlined"                
              error={Boolean(errors?.email && errors.email)}
              label={errors.email?.message ?? "E-mail"}              
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}               
              />
            <FormControl sx={{              
              width: '100%',
              display: 'flex',
            }}>
              <RadioGroup
                row                
                id="tipoVaga"
                value={radioValue}
                onClick={handleChange}
                sx={{
                  width: '70%',
                  border: '1px solid #ababab',
                  borderRadius: '15px',
                  p: '5px',
                  display: 'flex',
                  justifyContent: 'center'

              }}
              >
                <FormControlLabel value="frontend" control={<Radio />} label="Frontend" />
                <FormControlLabel value="backend" control={<Radio />} label="Backend" />
                <FormControlLabel value="qa" control={<Radio />} label="QA" />   
              </RadioGroup>
            </FormControl>
          </Box>
          <Box 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            "& .MuiSelect-select": {
              height: '10px',
              width: '200px'
            }
          }}>
            <FormControl >
                <FormLabel> Tipo de usuário *</FormLabel>
                <Select id="edicao" defaultValue={"10edicao"}  size="small" {...register("edicao")} >
                  <MenuItem value="11edicao" sx={{ height:'30px' }}>11ª Edição</MenuItem>
                  <MenuItem value="10edicao" sx={{ height:'30px' }}>10ª Edição</MenuItem>
                  <MenuItem value="9edicao" sx={{ height:'30px' }}>9ª Edição</MenuItem>
                </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: '40px', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                <TextField
                    placeholder="Descrição"
                    multiline
                    rows={5}
                    sx={{
                      width: '500px'
                    }}
                    id="descricao"
                    {...register('descricao')}
                    error={Boolean(errors?.descricao && errors.descricao)}
                    label={errors.descricao?.message ?? "Descrição"}  
                    />
            </Box>            
          </Box>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: '20px'}}>                
                <Button variant="contained" sx={{
                height: '50px'
                }} type="submit">
                Salvar
                </Button>
          </Box>
        </Box>
        </Box>
    </Grid>
  )
}