using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using OnlineDictionary.Models;

namespace OnlineDictionary.Service
{
    public class WordService : IWordService
    {
        private string _con = System.Configuration.ConfigurationManager.ConnectionStrings["dbconnection"].ToString();

        public bool Activate(string id)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_con))
                {
                    using (var cmd = new SqlCommand("sp_ActivateWord", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        conn.Open();
                        cmd.Parameters.AddWithValue("@Id", Int32.Parse(id));
                        var result = cmd.ExecuteNonQuery();
                        if (result <= 0)
                        {
                            return false;
                        }
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Create(WordModel data)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_con))
                {
                    using (var cmd = new SqlCommand("sp_CreateWord", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        conn.Open();
                        cmd.Parameters.AddWithValue("@Word", data.Word);
                        cmd.Parameters.AddWithValue("@Description", data.Description);
                        cmd.Parameters.AddWithValue("@VerBose", data.Verbose);
                        cmd.Parameters.AddWithValue("@Pos", data.Pos);
                        var result = cmd.ExecuteNonQuery();
                        if (result <= 0)
                        {
                            return false;
                        }
                        return true;
                    }
                }
            }catch(Exception ex)
            {
                return false;
            }
        }

        public bool Deactivate(string id)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_con))
                {
                    using (var cmd = new SqlCommand("sp_DeactivateWord", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        conn.Open();
                        cmd.Parameters.AddWithValue("@Id", Int32.Parse(id));
                        var result = cmd.ExecuteNonQuery();
                        if (result <= 0)
                        {
                            return false;
                        }
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Edit(string id, WordModel data)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_con))
                {
                    using (var cmd = new SqlCommand("sp_EditWord", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        conn.Open();
                        cmd.Parameters.AddWithValue("@Word", data.Word);
                        cmd.Parameters.AddWithValue("@Description", data.Description);
                        cmd.Parameters.AddWithValue("@VerBose", data.Verbose);
                        cmd.Parameters.AddWithValue("@Pos", data.Pos);
                        cmd.Parameters.AddWithValue("@Id", Int32.Parse(id));
                        var result = cmd.ExecuteNonQuery();
                        if (result <= 0)
                        {
                            return false;
                        }
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<WordModel> GetAll(string filter = default)
        {
            using (SqlConnection conn = new SqlConnection(_con))
            {
                using (var cmd = new SqlCommand("sp_GetAllWord", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    conn.Open();
                    var custId = cmd.Parameters.AddWithValue("@filter", filter ?? String.Empty);
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();
                    da.Fill(dt);
                    var listWord = new List<WordModel>();
                    foreach (DataRow dr in dt.Rows)
                    {
                        var obj = new WordModel {
                            Word = dr["Word"].ToString(),
                            Description = dr["Description"].ToString(),
                            Pos = dr["Pos"].ToString(),
                            Verbose = dr["Verbose"].ToString(),
                            Id = dr["Id"].ToString()
                        };
                        listWord.Add(obj);
                    }


                    return listWord;
                }
            }
        }
        public WordModel GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
