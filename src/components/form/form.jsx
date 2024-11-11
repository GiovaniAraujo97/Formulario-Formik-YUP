import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography, Input } from '@mui/material';

const TrabalhoFormulario = () => {
  // Usando Formik para gerenciamento do formulário
  const formik = useFormik({
    initialValues: {
      nome: '',
      titulo: '',
      descricao: '',
      arquivo: null,
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Campo obrigatório'),
      titulo: Yup.string().required('Campo obrigatório'),
      descricao: Yup.string().required('Campo obrigatório'),
      arquivo: Yup.mixed()
        .required('Campo obrigatório')
        .test('fileSize', 'O arquivo é muito grande', (value) => {
          return value && value.size <= 5 * 1024 * 1024; // Limite de 5MB
        })
        .test('fileType', 'Somente arquivos PDF são permitidos', (value) => {
          return value && value.type === 'application/pdf';
        }),
    }),
    onSubmit: (values) => {
      console.log('Dados do trabalho:', values);
    },
  });

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Formulário de Envio de Trabalho
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              fullWidth
              label="Nome do Aluno"
              name="nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
              margin="normal"
            />
          </div>

          <div>
            <TextField
              fullWidth
              label="Título do Trabalho"
              name="titulo"
              value={formik.values.titulo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.titulo && Boolean(formik.errors.titulo)}
              helperText={formik.touched.titulo && formik.errors.titulo}
              margin="normal"
            />
          </div>

          <div>
            <TextField
              fullWidth
              label="Descrição do Trabalho"
              name="descricao"
              value={formik.values.descricao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.descricao && Boolean(formik.errors.descricao)}
              helperText={formik.touched.descricao && formik.errors.descricao}
              margin="normal"
              multiline
              rows={4}
            />
          </div>

          <div>
            <Input
              type="file"
              name="arquivo"
              onChange={(event) => {
                formik.setFieldValue("arquivo", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.arquivo && Boolean(formik.errors.arquivo)}
            />
            {formik.touched.arquivo && formik.errors.arquivo && (
              <div style={{ color: 'red', marginTop: '8px' }}>
                {formik.errors.arquivo}
              </div>
            )}
          </div>

          <div>
            <Input 
            type="file"
            name="arquivo"
            onChange={(event) => {
                formik.setFieldValue("arquivo", event.currentTarget.files[0]);
            }}
            />
          </div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            style={
                { marginTop: '16px'}
            }
          >
            Enviar Trabalho
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default TrabalhoFormulario;
